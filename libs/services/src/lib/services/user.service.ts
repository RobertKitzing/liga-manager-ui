import { inject, Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { map, of, tap } from 'rxjs';
import {
    AllUsersGQL,
    AuthenticatedUserGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    Match,
    PasswordChangeGQL,
    PasswordResetGQL,
    PasswordResetMutationVariables,
    UpdateUserGQL,
    UpdateUserMutationVariables,
    User,
} from '@liga-manager-api/graphql';
import { AuthenticationService, LoginContext } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private allUsersGQL = inject(AllUsersGQL);

    private createUserGQL = inject(CreateUserGQL);

    private updateUserGQL = inject(UpdateUserGQL);

    private authenticatedUserGQL = inject(AuthenticatedUserGQL);

    private changePasswordQGL = inject(PasswordChangeGQL);

    private resetPasswordQGL = inject(PasswordResetGQL);

    private authenticationService = inject(AuthenticationService);

    allUsers$ = this.allUsersGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allUsers),
        map((teams) => {
            return (
                teams &&
                [...teams].sort((a, b) =>
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                    a?.email.toLocaleLowerCase()! >=
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                    b?.email.toLocaleLowerCase()!
                        ? 1
                        : -1,
                )
            );
        }),
    );

    createUser(variables: CreateUserMutationVariables) {
        return this.createUserGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allUsersGQL.document,
                },
            ],
        });
    }

    updateUser(variables: UpdateUserMutationVariables) {
        return this.updateUserGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allUsersGQL.document,
                },
            ],
        });
    }

    sendPasswordMail({email, target_path}: PasswordResetMutationVariables) {
        return this.resetPasswordQGL.mutate({
            email,
            target_path,
        });
    }

    login(context: LoginContext) {
        return this.authenticatedUserGQL
            .fetch(undefined, {
                fetchPolicy: 'network-only',
                context: {
                    loginContext: context,
                },
            })
            .pipe(
                tap((result) => {
                    this.authenticationService.user.set(
                        result.data.authenticatedUser as User,
                    );
                }),
            );
    }

    loadUser() {
        if (!this.authenticationService.accessToken()) {
            return of();
        }
        return this.authenticatedUserGQL.fetch().pipe(
            tap((result) => {
                this.authenticationService.user.set(
                    result.data.authenticatedUser as User,
                );
            }),
        );
    }

    isTeamAdminForTeam(teamId: string) {
        return (
            this.authenticationService.isTeamAdmin &&
            !!this.authenticationService
                .user()
                ?.teams?.find((t) => t?.id === teamId)
        );
    }

    canEditMatch(match: Match) {
        return (
            this.authenticationService.isAdmin ||
            this.isTeamAdminForTeam(match.home_team.id) ||
            this.isTeamAdminForTeam(match.guest_team.id)
        );
    }

    changePassword(newPassword: string, oldPassword: string) {
        return this.changePasswordQGL.mutate(
            {
                new_password: newPassword,
            },
            {
                context: {
                    headers: new HttpHeaders().set(
                        'Authorization',
                        `Basic ${Base64.encode(
                            this.authenticationService
                                .user()
                                ?.email.toLowerCase() +
                                ':' +
                                oldPassword,
                        )}`,
                    ),
                },
            },
        );
    }

    setPassword(newPassword: string) {
        return this.changePasswordQGL.mutate({
            new_password: newPassword,
        });
    }

}

import { Injectable } from '@angular/core';
import { APP_ROUTES } from '@lima/app.routes.enum';
import { Base64 } from 'js-base64';
import { map, tap } from 'rxjs';
import {
    AllUsersGQL,
    AuthenticatedUserGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    Match,
    PasswordChangeGQL,
    PasswordResetGQL,
    UpdateUserGQL,
    UpdateUserMutationVariables,
    User,
} from 'src/api/graphql';
import { AuthenticationService, LoginContext } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {

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

    constructor(
        private allUsersGQL: AllUsersGQL,
        private createUserGQL: CreateUserGQL,
        private updateUserGQL: UpdateUserGQL,
        private authenticatedUserGQL: AuthenticatedUserGQL,
        private changePasswordQGL: PasswordChangeGQL,
        private resetPasswordQGL: PasswordResetGQL,
        private authenticationService: AuthenticationService,
    ) {}

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

    sendPasswordMail(email: string) {
        return this.resetPasswordQGL.mutate({
            email,
            target_path: APP_ROUTES.NEW_PASSWORD_ROUTE,
        });
    }

    login(context: LoginContext) {
        console.log(context);
        return this.authenticatedUserGQL
            .fetch(undefined, {
                fetchPolicy: 'network-only',
                context: {
                    loginContext: context,
                },
            })
            .pipe(
                tap((result) => {
                    console.log(result);
                    this.authenticationService.user = result.data.authenticatedUser as User;
                }),
            );
    }

    loadUser() {
        return this.authenticatedUserGQL.fetch().pipe(
            tap((result) => {
                this.authenticationService.user = result.data.authenticatedUser as User;
            }),
        );
    }

    isTeamAdminForTeam(teamId: string) {
        return (
            this.authenticationService.isTeamAdmin &&
            !!this.authenticationService.user?.teams?.find((t) => t?.id === teamId)
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
                            this.authenticationService.user?.email.toLowerCase() + ':' + oldPassword,
                        )}`,
                    ),
                },
            },
        );
    }

    setPassword(newPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.changePasswordQGL
                .mutate({
                    new_password: newPassword,
                })
                .subscribe(
                    () => {
                        resolve();
                    },
                    (err) => {
                        reject(err);
                    },
                );
        });
    }

}

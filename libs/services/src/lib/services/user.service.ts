import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    AllUsersGQL,
    AuthenticatedUserGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    DeleteUserGQL,
    DeleteUserMutationVariables,
    InviteUserGQL,
    InviteUserMutationVariables,
    PasswordChangeGQL,
    PasswordResetGQL,
    PasswordResetMutationVariables,
    UpdateUserGQL,
    UpdateUserMutationVariables,
    UserRole,
} from '@liga-manager-api/graphql';
import { APP_ROUTES, LoginContext } from '@liga-manager-ui/common';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private authenticatedUserGQL = inject(AuthenticatedUserGQL);

    private allUsersGQL = inject(AllUsersGQL);

    private createUserGQL = inject(CreateUserGQL);

    private updateUserGQL = inject(UpdateUserGQL);

    private changePasswordQGL = inject(PasswordChangeGQL);

    private resetPasswordQGL = inject(PasswordResetGQL);

    private inviteUserGQL = inject(InviteUserGQL);

    private deleteUserGQL = inject(DeleteUserGQL);

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

    deleteUser(variables: DeleteUserMutationVariables) {
        return this.deleteUserGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allUsersGQL.document,
                },
            ],
        });
    }

    createUser(variables: CreateUserMutationVariables) {
        return this.createUserGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.allUsersGQL.document,
                },
            ],
        });
    }

    updateUser(variables: UpdateUserMutationVariables, role: UserRole | undefined) {
        return this.updateUserGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: role === UserRole.Admin ? this.allUsersGQL.document : this.authenticatedUserGQL.document,
                },
            ],
        });
    }

    sendPasswordMail(email: PasswordResetMutationVariables['email']) {
        const target_path = APP_ROUTES.NEW_PASSWORD;
        return this.resetPasswordQGL.mutate({
            email,
            target_path,
        });
    }

    sendInviteMail(user_id: InviteUserMutationVariables['user_id']) {
        const target_path = APP_ROUTES.REGISTER;
        return this.inviteUserGQL.mutate({
            user_id,
            target_path,
        });
    }

    changePassword(username: string, newPassword: string, oldPassword: string) {
        const loginContext: LoginContext = {
            username,
            password: oldPassword,
        };
        return this.changePasswordQGL.mutate(
            {
                new_password: newPassword,
            },
            {
                context: { loginContext },
            },
        );
    }

    setPassword(new_password: string) {
        return this.changePasswordQGL.mutate({
            new_password,
        });
    }

}

import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    AllUsersGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    PasswordChangeGQL,
    PasswordResetGQL,
    PasswordResetMutationVariables,
    UpdateUserGQL,
    UpdateUserMutationVariables,
} from '@liga-manager-api/graphql';
import { Store } from '@ngxs/store';
import { AuthStateSelectors, LoginContext } from '@liga-manager-ui/states';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private allUsersGQL = inject(AllUsersGQL);

    private createUserGQL = inject(CreateUserGQL);

    private updateUserGQL = inject(UpdateUserGQL);

    private store = inject(Store);

    private changePasswordQGL = inject(PasswordChangeGQL);

    private resetPasswordQGL = inject(PasswordResetGQL);

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

    changePassword(newPassword: string, oldPassword: string) {
        const loginContext: LoginContext = {
            username: this.store.selectSnapshot(AuthStateSelectors.properties.user)?.email || '',
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

    setPassword(newPassword: string) {
        return this.changePasswordQGL.mutate({
            new_password: newPassword,
        });
    }

}

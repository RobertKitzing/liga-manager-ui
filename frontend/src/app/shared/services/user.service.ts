import { Injectable } from '@angular/core';
import { APP_ROUTES } from '@lima/app-routes';
import { map } from 'rxjs';
import {
    AllUsersGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    PasswordResetGQL,
    UpdateUserGQL,
    UpdateUserMutationVariables,
} from 'src/api/graphql';

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
        private resetPasswordQGL: PasswordResetGQL,
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

}

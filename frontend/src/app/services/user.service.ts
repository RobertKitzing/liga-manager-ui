import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
    AllUsersGQL,
    CreateUserGQL,
    CreateUserMutationVariables,
    PasswordResetGQL,
    UpdateUserGQL,
    UpdateUserMutationVariables,
} from 'src/api/graphql';
import { NEW_PASSWORD_ROUTE } from '../app-routing.module';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    allUsers$ = this.allUsersGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allUsers),
        map((teams) => {
            return [...teams!].sort((a, b) =>
                a?.email.toLocaleLowerCase()! >= b?.email.toLocaleLowerCase()!
                    ? 1
                    : -1
            );
        })
    );

    constructor(
        private allUsersGQL: AllUsersGQL,
        private createUserGQL: CreateUserGQL,
        private updateUserGQL: UpdateUserGQL,
        private resetPasswordQGL: PasswordResetGQL
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
            target_path: NEW_PASSWORD_ROUTE,
        });
    }
}

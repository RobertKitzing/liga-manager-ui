import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GetAuthenticatedUser, Login, Logout, SetToken } from './actions';
import { AuthenticatedUserGQL, AuthenticatedUserQuery } from '@liga-manager-api/graphql';
import { catchError, of, tap } from 'rxjs';

export interface AuthStateModel {
    token?: string | null;
    user?: AuthenticatedUserQuery['authenticatedUser'];
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: undefined,
    },
})
@Injectable()
export class AuthState  {

    private authenticatedUserGQL = inject(AuthenticatedUserGQL);

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, action: Login) {
        return this.authenticatedUserGQL
            .fetch(undefined, {
                fetchPolicy: 'network-only',
                context: {
                    loginContext: action.loginContext,
                },
            }).pipe(
                tap(
                    (result) => {
                        patchState({ user: result.data.authenticatedUser });
                    },
                ),
            );
    }

    @Action(Logout)
    logout({ patchState }: StateContext<AuthStateModel>) {
        patchState({ token: undefined, user: undefined });
    }

    @Action(SetToken)
    setToken({ patchState, dispatch }: StateContext<AuthStateModel>, action: SetToken) {
        patchState({ token: action.token });
        dispatch(GetAuthenticatedUser);
    }

    @Action(GetAuthenticatedUser)
    getAuthenticatedUser({ getState, patchState }: StateContext<AuthStateModel>, action: GetAuthenticatedUser) {
        if (!getState().token) {
            return of();
        }
        return this.authenticatedUserGQL.fetch(
            undefined,
            {
                fetchPolicy: action.forceRefresh ? 'network-only' : 'cache-first',
            },
        ).pipe(
            tap(
                (result) => {
                    patchState({ user: result.data.authenticatedUser });
                },
            ),
            catchError(
                () => {
                    patchState({ user: undefined });
                    return of();
                },
            ),
        );
    }

}

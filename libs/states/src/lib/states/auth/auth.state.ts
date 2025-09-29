import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { GetAuthenticatedUser, Login, Logout, SetToken } from './actions';
import { AuthenticatedUserGQL, AuthenticatedUserQuery } from '@liga-manager-api/graphql';
import { tap } from 'rxjs';

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
export class AuthState implements NgxsOnInit {

    private authenticatedUserGQL = inject(AuthenticatedUserGQL);

    ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
        if (ctx.getState().token) {
            ctx.dispatch(GetAuthenticatedUser);
        }
    }

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
    setToken({ patchState }: StateContext<AuthStateModel>, action: SetToken) {
        patchState({ token: action.token });
    }

    @Action(GetAuthenticatedUser)
    getAuthenticatedUser({ patchState }: StateContext<AuthStateModel>) {
        return this.authenticatedUserGQL.fetch().pipe(
            tap(
                (result) => patchState({ user: result.data.authenticatedUser }),
            ),
        );
    }

}

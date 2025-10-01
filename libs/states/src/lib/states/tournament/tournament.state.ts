import { inject, Injectable } from '@angular/core';
import { AllTournamentListGQL, AllTournamentListQuery } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { GetTournaments } from './actions';
import { tap } from 'rxjs';

export interface TournamentStateModel {
    tournaments: AllTournamentListQuery['allTournaments'];
}

@State<TournamentStateModel>({
    name: 'tournament',
    defaults: {
        tournaments: [],
    },
})
@Injectable()
export class TournamentState implements NgxsOnInit {

    private allTournamentListGQL = inject(AllTournamentListGQL);

    ngxsOnInit(ctx: StateContext<TournamentStateModel>): void {
        ctx.dispatch(GetTournaments);
    }

    @Action(GetTournaments)
    getTournaments({ patchState }: StateContext<TournamentStateModel>, action: GetTournaments) {
        return this.allTournamentListGQL
            .fetch(undefined, {
                fetchPolicy: action.forceReload ? 'network-only' : 'cache-first',
            }).pipe(
                tap(
                    (result) => {
                        patchState({ tournaments: result.data.allTournaments });
                    },
                ),
            );
    }

}

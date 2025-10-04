import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AllSeasonsListGQL, AllSeasonsListQuery, CreateSeasonGQL } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { CreateSeason } from './actions';

export interface SeasonStateModel {
    seasons: AllSeasonsListQuery['allSeasons'];
}

@State<SeasonStateModel>({
    name: 'season',
    defaults: {
        seasons: [],
    },
})
@Injectable()
export class SeasonState implements NgxsOnInit {

    private allSeasonlistGQL = inject(AllSeasonsListGQL);

    private createSeasonGQL = inject(CreateSeasonGQL);

    private destroyRef = inject(DestroyRef);

    ngxsOnInit(ctx: StateContext<SeasonStateModel>): void {
        this.allSeasonlistGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                ctx.patchState({ seasons: result.data.allSeasons });
            },
        );
    }

    @Action(CreateSeason)
    createTournament(_: StateContext<SeasonStateModel>, action: CreateSeason) {
        return this.createSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.allSeasonlistGQL.document,
                    },
                ],
            },
        );
    }

}

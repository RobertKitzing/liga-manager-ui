import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateSeasonGQL, DeleteSeasonGQL, EndSeasonGQL, SeasonListGQL, SeasonListQuery, StartSeasonGQL } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { CreateSeason, DeleteSeason, EndSeason, StartSeason } from './actions';
import { tap } from 'rxjs';
import { SetSelectedSeason } from '../selected-items';

export interface SeasonStateModel {
    seasons: SeasonListQuery['allSeasons'];
}

@State<SeasonStateModel>({
    name: 'season',
    defaults: {
        seasons: [],
    },
})
@Injectable()
export class SeasonState implements NgxsOnInit {

    private seasonListGQL = inject(SeasonListGQL);

    private createSeasonGQL = inject(CreateSeasonGQL);

    private startSeasonGQL = inject(StartSeasonGQL);

    private endSeasonGQL = inject(EndSeasonGQL);

    private deleteSeasonGQL = inject(DeleteSeasonGQL);

    private destroyRef = inject(DestroyRef);

    ngxsOnInit(ctx: StateContext<SeasonStateModel>): void {
        this.seasonListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                ctx.patchState({ seasons: result.data.allSeasons });
            },
        );
    }

    @Action(CreateSeason)
    createSeason(_: StateContext<SeasonStateModel>, action: CreateSeason) {
        return this.createSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.seasonListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(StartSeason)
    startSeason(_: StateContext<SeasonStateModel>, action: StartSeason) {
        return this.startSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.seasonListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(EndSeason)
    endSeason(ctx: StateContext<SeasonStateModel>, action: EndSeason) {
        return this.endSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.seasonListGQL.document,
                    },
                ],
            },
        ).pipe(
            tap(
                () => ctx.dispatch(new SetSelectedSeason('administration', undefined)),
            ),
        );
    }

    @Action(DeleteSeason)
    deleteSeason(ctx: StateContext<SeasonStateModel>, action: DeleteSeason) {
        return this.deleteSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.seasonListGQL.document,
                    },
                ],
            },
        ).pipe(
            tap(
                () => ctx.dispatch(new SetSelectedSeason('administration', undefined)),
            ),
        );
    }

}

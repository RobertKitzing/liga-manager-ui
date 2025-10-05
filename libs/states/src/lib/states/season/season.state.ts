import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddPenaltyGQL, AddTeamToSeasonGQL, CreateSeasonGQL, DeleteSeasonGQL, EndSeasonGQL, RankingByIdGQL, RemovePenaltyGQL, SeasonByIdGQL, SeasonListGQL, SeasonListQuery, SeasonPenaltiesGQL, StartSeasonGQL } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { AddPenalty, AddTeamToSeason, CreateSeason, DeleteSeason, EndSeason, RemovePenalty, StartSeason } from './actions';
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

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private seasonListGQL = inject(SeasonListGQL);

    private createSeasonGQL = inject(CreateSeasonGQL);

    private startSeasonGQL = inject(StartSeasonGQL);

    private endSeasonGQL = inject(EndSeasonGQL);

    private deleteSeasonGQL = inject(DeleteSeasonGQL);

    private rankingGQL = inject(RankingByIdGQL);

    private addPenaltyGQL = inject(AddPenaltyGQL);

    private removePenaltyGQL = inject(RemovePenaltyGQL);

    private seasonPenaltiesGQL = inject(SeasonPenaltiesGQL);

    private addTeamToSeasonGQL = inject(AddTeamToSeasonGQL);

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

    @Action(AddPenalty)
    addPenalty(_: StateContext<SeasonStateModel>, action: AddPenalty) {
        return this.addPenaltyGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.rankingGQL.document,
                        variables: { id: action.payload.season_id },
                    },
                    {
                        query: this.seasonPenaltiesGQL.document,
                        variables: { id: action.payload.season_id },
                    },
                ],
            },
        );
    }

    @Action(RemovePenalty)
    removePenalty(_: StateContext<SeasonStateModel>, action: RemovePenalty) {
        return this.removePenaltyGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.rankingGQL.document,
                        variables: { id: action.payload.season_id },
                    },
                    {
                        query: this.seasonPenaltiesGQL.document,
                        variables: { id: action.payload.season_id },
                    },
                ],
            },
        );
    }

    @Action(AddTeamToSeason)
    addTeamToSeason(_: StateContext<SeasonStateModel>, action: AddTeamToSeason) {
        return this.addTeamToSeasonGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: action.payload.season_id },
                    },
                ],
            },
        );
    }

}

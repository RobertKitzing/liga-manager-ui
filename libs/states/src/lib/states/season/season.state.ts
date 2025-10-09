import { inject, Injectable } from '@angular/core';
import { AddPenaltyGQL, AddTeamToSeasonGQL, CreateMatchesForSeasonGQL, CreateSeasonGQL, DeleteSeasonGQL, EndSeasonGQL, RankingByIdGQL, RemovePenaltyGQL, RemoveTeamFromSeasonGQL, ReplaceTeamInSeasonGQL, SeasonByIdGQL, SeasonListGQL, SeasonListQuery, SeasonPenaltiesGQL, StartSeasonGQL } from '@liga-manager-api/graphql';
import { Action, State, StateContext } from '@ngxs/store';
import { AddPenalty, AddTeamToSeason, CreateMatchesForSeason, CreateSeason, DeleteSeason, EndSeason, RemovePenalty, RemoveTeamFromSeason, ReplaceTeamInSeason, RescheduleMatchDays, SetSeasons, StartSeason } from './actions';
import { tap } from 'rxjs';
import { SetSelectedSeason } from '../selected-items';
import { Apollo, gql } from 'apollo-angular';

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
export class SeasonState {

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

    private createMatchesForSeasonGQL = inject(CreateMatchesForSeasonGQL);

    private removeTeamFromSeasonGQL = inject(RemoveTeamFromSeasonGQL);

    private replaceTeamInSeasonGQL = inject(ReplaceTeamInSeasonGQL);

    private apollo = inject(Apollo);

    @Action(SetSeasons)
    setSeason({ patchState }: StateContext<SeasonStateModel>, action: SetSeasons) {
        patchState({ seasons: action.seasons });
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

    @Action(RemoveTeamFromSeason)
    removeTeamFromSeason(_: StateContext<SeasonStateModel>, action: RemoveTeamFromSeason) {
        return this.removeTeamFromSeasonGQL.mutate(
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

    @Action(ReplaceTeamInSeason)
    replaceTeamInSeason(_: StateContext<SeasonStateModel>, action: ReplaceTeamInSeason) {
        return this.replaceTeamInSeasonGQL.mutate(
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

    @Action(CreateMatchesForSeason)
    createMatchesForSeason(_: StateContext<SeasonStateModel>, action: CreateMatchesForSeason) {
        return this.createMatchesForSeasonGQL.mutate(
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

    @Action(RescheduleMatchDays)
    rescheduleMatchDays(_: StateContext<SeasonStateModel>, action: RescheduleMatchDays) {
        let mutation = 'mutation RescheduleMatchDays {\n';
        action.payload.forEach(
            (param, i) => {
                mutation += `rescheduleMatchDay${i}: rescheduleMatchDay(match_day_id: "${param.match_day_id}", date_period: { from: "${param.date_period.from.toJSON()}", to: "${param.date_period.to.toJSON()}" }) \n`;
            },
        );
        mutation += '}';
        return this.apollo.mutate(
            {
                mutation: gql(mutation),
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: action.season_id },
                    },
                ],
            },
        );
    }

}

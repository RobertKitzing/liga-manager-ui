import { DestroyRef, inject, Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import {
    RankingByIdGQL,
    ScheduleAllMatchesForMatchDayGQL,
    ScheduleAllMatchesForMatchDayMutationVariables,
    ScheduleAllMatchesForSeasonGQL,
    ScheduleAllMatchesForSeasonMutationVariables,
    SeasonByIdGQL,
    SeasonListGQL,
    SeasonPenaltiesGQL,
    SeasonPenaltiesQueryVariables,
} from '@liga-manager-api/graphql';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SetSeasons } from '@liga-manager-ui/states';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    private seasonListGQL = inject(SeasonListGQL);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private rankingGQL = inject(RankingByIdGQL);

    private scheduleAllMatchesForSeasonGQL = inject(ScheduleAllMatchesForSeasonGQL);

    private scheduleAllMatchesForMatchDayGQL = inject(ScheduleAllMatchesForMatchDayGQL);

    private seasonPenaltiesGQL = inject(SeasonPenaltiesGQL);

    private store = inject(Store);

    private destroyRef = inject(DestroyRef);

    constructor() {
        this.seasonListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetSeasons(result.data.allSeasons));
            },
        );
    }

    reloadSeasons() {
        return this.seasonListGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

    getSeasonById$(id: string | undefined) {
        if (!id) {
            return of(undefined);
        }
        return this.seasonByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.season));
    }

    getRankingById$(id: string) {
        return this.rankingGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data?.season?.ranking));
    }

    refetchRankingById(id: string) {
        this.rankingGQL.watch({ id }).refetch();
    }

    refetchSeasonById(id: string) {
        this.seasonByIdGQL.watch({ id }).refetch();
    }

    getSeasonPenalties(params: SeasonPenaltiesQueryVariables) {
        return this.seasonPenaltiesGQL.watch(params).valueChanges.pipe(
            map(({ data }) => data.season?.ranking?.penalties),
        );
    }

    scheduleAllMatchesForMatchDay(params: ScheduleAllMatchesForMatchDayMutationVariables, seasonId?: string) {
        return this.scheduleAllMatchesForMatchDayGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: seasonId },
                    },
                ],
            },
        );
    }

    scheduleAllMatchesForSeason(params: ScheduleAllMatchesForSeasonMutationVariables) {
        return this.scheduleAllMatchesForSeasonGQL.mutate(
            params,
            {
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: params.season_id },
                    },
                ],
            },
        );
    }

}

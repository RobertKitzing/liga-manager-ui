import { Injectable } from '@angular/core';
import {
    CancelMatchGQL,
    CancelMatchMutationVariables,
    LocateMatchGQL,
    LocateMatchMutationVariables,
    RankingByIdGQL,
    ScheduleMatchGQL,
    ScheduleMatchMutationVariables,
    SeasonByIdGQL,
    SubmitResultGQL,
    SubmitResultMutationVariables,
} from 'src/api/graphql';
import { SeasonService } from './season.service';

@Injectable({
    providedIn: 'root',
})
export class MatchService {

    constructor(
        private submitResultGQL: SubmitResultGQL,
        private seasonByIdGQL: SeasonByIdGQL,
        private seasonService: SeasonService,
        private rankingByIdGQL: RankingByIdGQL,
        private locateMatchQGL: LocateMatchGQL,
        private scheduleMatchGQL: ScheduleMatchGQL,
        private cancelMatchGQL: CancelMatchGQL,
    ) {}

    submitMatchResult(variables: SubmitResultMutationVariables) {
        const seasonId = this.seasonService.progressSeason$.getValue();
        return this.submitResultGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: seasonId.id },
                },
                {
                    query: this.rankingByIdGQL.document,
                    variables: { id: seasonId.id },
                },
            ],
        });
    }

    locateMatch(variables: LocateMatchMutationVariables) {
        const seasonId = this.seasonService.progressSeason$.getValue();
        return this.locateMatchQGL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: seasonId.id },
                },
            ],
        });
    }

    scheduleMatch(variables: ScheduleMatchMutationVariables) {
        const seasonId = this.seasonService.progressSeason$.getValue();
        return this.scheduleMatchGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: seasonId.id },
                },
            ],
        });
    }

    cancelMatch(variables: CancelMatchMutationVariables) {
        const seasonId = this.seasonService.progressSeason$.getValue();
        return this.cancelMatchGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.seasonByIdGQL.document,
                    variables: { id: seasonId.id },
                },
                {
                    query: this.rankingByIdGQL.document,
                    variables: { id: seasonId.id },
                },
            ],
        });
    }

}

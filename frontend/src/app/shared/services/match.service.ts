import { Injectable } from '@angular/core';
import {
    CancelMatchGQL,
    CancelMatchMutationVariables,
    LocateMatchGQL,
    LocateMatchMutationVariables,
    MatchByIdGQL,
    RankingByIdGQL,
    ScheduleMatchGQL,
    ScheduleMatchMutationVariables,
    SeasonByIdGQL,
    SubmitResultGQL,
    SubmitResultMutationVariables,
} from 'src/api/graphql';
import { SeasonService } from './season.service';
import { map } from 'rxjs';

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
        private matchByIdGQL: MatchByIdGQL,
    ) {}

    getMatchById$(id: string) {
        return this.matchByIdGQL.watch({ id }).valueChanges.pipe(
            map(({ data }) => data.match ),
        )
    }

    submitMatchResult(variables: SubmitResultMutationVariables) {
        return this.submitResultGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.matchByIdGQL.document,
                    variables: { id: variables.match_id },
                },
            ],
        });
    }

    locateMatch(variables: LocateMatchMutationVariables) {
        return this.locateMatchQGL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.matchByIdGQL.document,
                    variables: { id: variables.match_id },
                },
            ],
        });
    }

    scheduleMatch(variables: ScheduleMatchMutationVariables) {
        return this.scheduleMatchGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.matchByIdGQL.document,
                    variables: { id: variables.match_id },
                },
            ],
        });
    }

    cancelMatch(variables: CancelMatchMutationVariables) {
        return this.cancelMatchGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.matchByIdGQL.document,
                    variables: { id: variables.match_id },
                },
            ],
        });
    }

}

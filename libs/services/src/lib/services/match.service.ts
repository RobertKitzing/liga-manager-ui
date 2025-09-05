import { inject, Injectable } from '@angular/core';
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
} from '@liga-manager-api/graphql';
import { SeasonService } from './season.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MatchService {

    private submitResultGQL = inject(SubmitResultGQL);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private seasonService = inject(SeasonService);

    private rankingByIdGQL = inject(RankingByIdGQL);

    private locateMatchQGL = inject(LocateMatchGQL);

    private scheduleMatchGQL = inject(ScheduleMatchGQL);

    private cancelMatchGQL = inject(CancelMatchGQL);

    private matchByIdGQL = inject(MatchByIdGQL);


    getMatchById$(id: string) {
        return this.matchByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.match));
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

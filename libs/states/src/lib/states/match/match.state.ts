import { inject, Injectable } from '@angular/core';
import { MatchByIdGQL, SubmitResultGQL } from '@liga-manager-api/graphql';
import { Action, State, StateContext } from '@ngxs/store';
import { RemoveResult } from './actions';

@State<void>({
    name: 'match',
})
@Injectable()
export class MatchState {

    private submitResultGQL = inject(SubmitResultGQL);

    private matchByIdGQL = inject(MatchByIdGQL);

    @Action(RemoveResult)
    deletePitch(_: StateContext<void>, action: RemoveResult) {
        return this.submitResultGQL.mutate(
            {
                match_id: action.match_id,
                guest_score: undefined,
                home_score: undefined,
            },
            {
                refetchQueries: [
                    {
                        query: this.matchByIdGQL.document,
                        variables: { id: action.match_id },
                    },
                ],
            },
        );
    }

}

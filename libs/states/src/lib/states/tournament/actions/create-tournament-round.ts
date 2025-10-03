import { CreateTournamentRoundMutationVariables } from '@liga-manager-api/graphql';

export class CreateTournamentRound {

    static readonly type = '[TournamentState] CreateTournamentRound';

    constructor(
        public payload: CreateTournamentRoundMutationVariables,
    ) {

    }

}

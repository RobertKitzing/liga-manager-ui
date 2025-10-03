import { CreateTournamentMutationVariables } from '@liga-manager-api/graphql';

export class CreateTournament {

    static readonly type = '[TournamentState] CreateTournament';

    constructor(
        public payload: CreateTournamentMutationVariables,
    ) {

    }

}

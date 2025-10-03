import { StartTournamentMutationVariables } from '@liga-manager-api/graphql';

export class StartTournament {

    static readonly type = '[TournamentState] StartTournament';

    constructor(
        public payload: StartTournamentMutationVariables,
    ) {

    }

}

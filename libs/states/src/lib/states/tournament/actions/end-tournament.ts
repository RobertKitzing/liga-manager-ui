import { EndTournamentMutationVariables } from '@liga-manager-api/graphql';

export class EndTournament {

    static readonly type = '[TournamentState] EndTournament';

    constructor(
        public payload: EndTournamentMutationVariables,
    ) {

    }

}

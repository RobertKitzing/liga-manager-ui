import { DeleteTournamentMutationVariables } from '@liga-manager-api/graphql';

export class DeleteTournament {

    static readonly type = '[TournamentState] DeleteTournament';

    constructor(
        public payload: DeleteTournamentMutationVariables,
    ) {

    }

}

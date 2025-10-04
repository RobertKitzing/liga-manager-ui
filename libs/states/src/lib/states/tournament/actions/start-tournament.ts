import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { StartTournamentMutationVariables } from '@liga-manager-api/graphql';

export class StartTournament {

    static readonly type = '[TournamentState] StartTournament';

    notification = {
        message: marker('SUCCESS.START_TOURNAMENT'),
        translateParams: {
            title: { name: this.name },
        },
    };

    constructor(
        public payload: StartTournamentMutationVariables,
        public name: string,
    ) {

    }

}

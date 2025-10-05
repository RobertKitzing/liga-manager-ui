import { CreateTournamentMutationVariables } from '@liga-manager-api/graphql';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';

export class CreateTournament implements INotification {

    static readonly type = '[TournamentState] CreateTournament';

    notification = {
        message: marker('SUCCESS.CREATE_TOURNAMENT'),
        translateParams: {
            message: { name: this.payload.name },
        },
    };

    constructor(
        public payload: CreateTournamentMutationVariables,
    ) {

    }

}

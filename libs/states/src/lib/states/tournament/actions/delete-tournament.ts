import { DeleteTournamentMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class DeleteTournament implements INotification, IConfirm {

    static readonly type = '[TournamentState] DeleteTournament';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_DELETE_TOURNAMENT'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.DELETE_TOURNAMENT'),
        translateParams: {
            title: { name: this.name },
        },
    };

    constructor(
        public payload: DeleteTournamentMutationVariables,
        public name: string,
    ) {

    }

}

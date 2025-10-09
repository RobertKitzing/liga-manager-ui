import { DeleteTeamMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class DeleteTeam implements INotification, IConfirm {

    static readonly type = '[TeamState] DeleteTeam';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_DELETE_TEAM'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.DELETE_TEAM'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: DeleteTeamMutationVariables,
        public name: string,
    ) {

    }

}

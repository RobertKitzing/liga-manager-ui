import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { RenameTeamMutationVariables } from '@liga-manager-api/graphql';

export class RenameTeam implements INotification {

    static readonly type = '[TeamState] RenameTeam';

    notification = {
        message: marker('SUCCESS.RENAME_TEAM'),
        translateParams: {
            message: { oldName: this.oldName, newName: this.payload.new_name },
        },
    };

    constructor(
        public payload: RenameTeamMutationVariables,
        public oldName: string,
    ) {

    }

}

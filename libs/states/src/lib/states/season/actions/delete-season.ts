import { DeleteSeasonMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class DeleteSeason implements INotification, IConfirm {

    static readonly type = '[SeasonState] DeleteSeason';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_DELETE_SEASON'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.DELETE_SEASON'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: DeleteSeasonMutationVariables,
        public name: string,
    ) {

    }

}

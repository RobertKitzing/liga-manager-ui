import { RemovePenaltyMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class RemovePenalty implements INotification, IConfirm {

    static readonly type = '[SeasonState] RemovePenalty';

    notification = {
        message: marker('SUCCESS.REMOVE_PENALTY'),
    };

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_DELETE_PENALTY'),
    };

    constructor(
        public payload: RemovePenaltyMutationVariables,
    ) {

    }

}

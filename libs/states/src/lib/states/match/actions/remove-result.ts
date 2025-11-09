import { SubmitResultMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class RemoveResult implements INotification, IConfirm {

    static readonly type = '[MatchState] RemoveResult';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_REMOVE_RESULT'),
    };

    notification = {
        message: marker('SUCCESS.REMOVE_RESULT'),
    };

    constructor(
        public match_id: SubmitResultMutationVariables['match_id'],
    ) {

    }

}

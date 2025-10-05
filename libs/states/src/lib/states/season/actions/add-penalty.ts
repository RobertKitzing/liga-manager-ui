import { AddPenaltyMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class AddPenalty implements INotification {

    static readonly type = '[SeasonState] AddPenalty';

    notification = {
        message: marker('SUCCESS.ADD_PENALTY'),
    };

    constructor(
        public payload: AddPenaltyMutationVariables,
    ) {

    }

}

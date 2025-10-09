import { CreateSeasonMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class CreateSeason implements INotification {

    static readonly type = '[SeasonState] CreateSeason';

    notification = {
        message: marker('SUCCESS.CREATE_SEASON'),
        translateParams: {
            message: { name: this.payload.name },
        },
    };

    constructor(
        public payload: CreateSeasonMutationVariables,
    ) {

    }

}

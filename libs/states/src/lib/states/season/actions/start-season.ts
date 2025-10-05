import { StartSeasonMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class StartSeason implements INotification {

    static readonly type = '[SeasonState] StartSeason';

    notification = {
        message: marker('SUCCESS.START_SEASON'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: StartSeasonMutationVariables,
        public name: string,
    ) {

    }

}

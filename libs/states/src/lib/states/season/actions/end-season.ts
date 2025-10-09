import { EndSeasonMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class EndSeason implements INotification, IConfirm {

    static readonly type = '[SeasonState] EndSeason';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_END_SEASON'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.END_SEASON'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: EndSeasonMutationVariables,
        public name: string,
    ) {

    }

}

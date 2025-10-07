import { RescheduleMatchDayMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class RescheduleMatchDays implements INotification {

    static readonly type = '[SeasonState] RescheduleMatchDays';

    notification = {
        message: marker('SUCCESS.RESCHEDULE_MATCH_DAYS'),
    };

    constructor(
        public payload: RescheduleMatchDayMutationVariables[],
        public season_id: string,
    ) {

    }

}

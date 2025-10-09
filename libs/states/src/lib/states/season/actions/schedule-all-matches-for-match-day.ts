import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { ScheduleAllMatchesForMatchDayMutationVariables } from '@liga-manager-api/graphql';

export class ScheduleAllMatchesForMatchDay implements INotification {

    static readonly type = '[SeasonState] ScheduleAllMatchesForMatchDay';

    notification = {
        message: marker('SUCCESS.SCHEDULE_ALL_MATCHES_FOR_MATCHDAY'),
    };

    constructor(
        public payload: ScheduleAllMatchesForMatchDayMutationVariables,
        public season_id: string,
    ) {

    }

}

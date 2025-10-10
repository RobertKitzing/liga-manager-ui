import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { ScheduleAllMatchesForSeasonMutationVariables } from '@liga-manager-api/graphql';

export class ScheduleAllMatchesForSeason implements INotification {

    static readonly type = '[SeasonState] ScheduleAllMatchesForSeason';

    notification = {
        message: marker('SUCCESS.SCHEDULE_ALL_MATCHES_FOR_SEASON'),
    };

    constructor(
        public payload: ScheduleAllMatchesForSeasonMutationVariables,
    ) {

    }

}

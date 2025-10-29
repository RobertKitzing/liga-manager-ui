import { CreateMatchDayForSeasonMutationVariables, DatePeriod } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class CreateMatchDaysForSeason implements INotification {

    static readonly type = '[SeasonState] CreateMatchDayForSeason';

    notification = {
        message: marker('SUCCESS.CREATE_MATCHES_FOR_SEASON'),
    };

    constructor(
        public season_id: CreateMatchDayForSeasonMutationVariables['season_id'],
        public dates: DatePeriod[],
    ) {

    }

}
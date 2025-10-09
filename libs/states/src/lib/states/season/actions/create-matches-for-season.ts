import { CreateMatchesForSeasonMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class CreateMatchesForSeason implements INotification {

    static readonly type = '[SeasonState] CreateMatchesForSeason';

    notification = {
        message: marker('SUCCESS.CREATE_MATCHES_FOR_SEASON'),
    };

    constructor(
        public payload: CreateMatchesForSeasonMutationVariables,
    ) {

    }

}
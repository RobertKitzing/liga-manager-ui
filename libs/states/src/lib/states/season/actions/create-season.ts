import { CreateSeasonMutationVariables } from '@liga-manager-api/graphql';
import { INotification } from '../../../interfaces';

export class CreateSeason implements INotification {

    static readonly type = '[SeasonState] CreateSeason';

    notification = {
        message: 'SUCCESS.CREATE_SEASON',
        translateParams: {
            title: { name: this.payload.name },
        },
    };

    constructor(
        public payload: CreateSeasonMutationVariables,
    ) {

    }

}

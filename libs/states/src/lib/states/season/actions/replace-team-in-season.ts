import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { ReplaceTeamInSeasonMutationVariables } from '@liga-manager-api/graphql';

export class ReplaceTeamInSeason implements INotification {

    static readonly type = '[SeasonState] ReplaceTeamInSeason';

    notification = {
        message: marker('SUCCESS.REPLACE_TEAM_IN_SEASON'),
        translateParams: {
            message: {
                oldTeamName: this.oldTeamName,
            },
        },
    };

    constructor(
        public payload: ReplaceTeamInSeasonMutationVariables,
        public oldTeamName: string,
    ) {

    }

}
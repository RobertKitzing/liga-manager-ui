import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { RemoveTeamFromSeasonMutationVariables } from '@liga-manager-api/graphql';

export class RemoveTeamFromSeason implements INotification {

    static readonly type = '[SeasonState] RemoveTeamFromSeason';

    notification = {
        message: marker('SUCCESS.REMOVE_TEAM_FROM_SEASON'),
        translateParams: {
            message: {
                teamName: this.teamName,
                seasonName: this.seasonName,
            },
        },
    };

    constructor(
        public payload: RemoveTeamFromSeasonMutationVariables,
        public teamName: string,
        public seasonName: string,
    ) {

    }

}
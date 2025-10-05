import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { AddTeamToSeasonMutationVariables } from '@liga-manager-api/graphql';

export class AddTeamToSeason implements INotification {

    static readonly type = '[SeasonState] AddTeamToSeason';

    notification = {
        message: marker('SUCCESS.ADD_TEAM_TO_SEASON'),
        translateParams: {
            message: {
                teamName: this.teamName,
                seasonName: this.seasonName,
            },
        },
    };

    constructor(
        public payload: AddTeamToSeasonMutationVariables,
        public teamName: string,
        public seasonName: string,
    ) {

    }

}
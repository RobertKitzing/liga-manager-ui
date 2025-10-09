import { EndTournamentMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class EndTournament implements INotification, IConfirm {

    static readonly type = '[TournamentState] EndTournament';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_END_TOURNAMENT'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.END_TOURNAMENT'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: EndTournamentMutationVariables,
        public name: string,
    ) {

    }

}

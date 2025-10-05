import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';

export class CreateTeam implements INotification {

    static readonly type = '[TeamState] CreateTeam';

    notification = {
        message: marker('SUCCESS.CREATE_TEAM'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public name: string,
    ) {

    }

}

import { DeletePitchMutationVariables } from '@liga-manager-api/graphql';
import { IConfirm, INotification } from '../../../interfaces';
import { marker } from '@colsen1991/ngx-translate-extract-marker';

export class DeletePitch implements INotification, IConfirm {

    static readonly type = '[PitchState] DeletePitch';

    confirm = {
        message: marker('CONFIRM.ARE_YOU_SURE_TO_DELETE_PITCH'),
        translateParams: { name: this.name },
    };

    notification = {
        message: marker('SUCCESS.DELETE_PITCH'),
        translateParams: {
            message: { name: this.name },
        },
    };

    constructor(
        public payload: DeletePitchMutationVariables,
        public name: string,
    ) {

    }

}

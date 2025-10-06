import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { INotification } from '../../../interfaces';
import { CreatePitchMutationVariables } from '@liga-manager-api/graphql';

export class CreatePitch implements INotification {

    static readonly type = '[PitchState] CreatePitch';

    notification = {
        message: marker('SUCCESS.CREATE_PITCH'),
        translateParams: {
            message: { name: this.payload.label },
        },
    };

    constructor(
        public payload: CreatePitchMutationVariables,
    ) {

    }

}

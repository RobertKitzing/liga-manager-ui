import { inject, Injectable } from '@angular/core';
import { CreatePitchGQL, DeletePitchGQL, PitchesGQL, PitchesQuery } from '@liga-manager-api/graphql';
import { Action, State, StateContext } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { CreatePitch, DeletePitch, SetPitches } from './actions';

export interface PitchStateModel {
    pitches: PitchesQuery['allPitches'];
}

@State<PitchStateModel>({
    name: 'pitch',
    defaults: {
        pitches: [],
    },
})
@Injectable()
export class PitchState {

    private pitchesGQL = inject(PitchesGQL);

    private createPitchGQL = inject(CreatePitchGQL);

    private deletePitchGQL = inject(DeletePitchGQL);

    @Action(SetPitches)
    setPitches({ patchState }: StateContext<PitchStateModel>, action: SetPitches) {
        patchState({ pitches: action.pitches });
    }

    @Action(CreatePitch)
    createPitch(_: StateContext<PitchStateModel>, action: CreatePitch) {
        if (!action.payload.id) {
            action.payload.id = uuidv4();
        }
        return this.createPitchGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.pitchesGQL.document,
                    },
                ],
            },
        );
    }

    @Action(DeletePitch)
    deletePitch(_: StateContext<PitchStateModel>, action: DeletePitch) {
        return this.deletePitchGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.pitchesGQL.document,
                    },
                ],
            },
        );
    }

}

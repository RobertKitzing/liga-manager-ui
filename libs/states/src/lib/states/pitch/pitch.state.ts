import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreatePitchGQL, DeletePitchGQL, PitchesGQL, PitchesQuery } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { CreatePitch, DeletePitch } from './actions';

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
export class PitchState implements NgxsOnInit {

    private pitchesGQL = inject(PitchesGQL);

    private createPitchGQL = inject(CreatePitchGQL);

    private deletePitchGQL = inject(DeletePitchGQL);

    private destroyRef = inject(DestroyRef);

    ngxsOnInit(ctx: StateContext<PitchStateModel>): void {
        this.pitchesGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                ctx.patchState({ pitches: result.data.allPitches });
            },
        );
    }

    @Action(CreatePitch)
    createPitch(_: StateContext<PitchStateModel>, action: CreatePitch) {
        return this.createPitchGQL.mutate(
            {
                id: uuidv4(),
                ...action.payload,
            },
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

import { PitchStateModel } from '../pitch.state';

export class SetPitches {

    static readonly type = '[PitchState] SetPitches';

    constructor(
        public pitches: PitchStateModel['pitches'],
    ) {}

}

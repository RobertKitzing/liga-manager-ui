import { createPropertySelectors, Selector } from '@ngxs/store';
import { sortArrayBy } from '@liga-manager-ui/utils';
import { PitchState, PitchStateModel } from './pitch.state';

export class PitchSelectors {

    static properties = createPropertySelectors<PitchStateModel>(PitchState);

    @Selector([PitchSelectors.properties.pitches])
    static pitches(pitches: PitchStateModel['pitches']) {
        return sortArrayBy(pitches || [], 'name');
    }

}

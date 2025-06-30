import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PitchesGQL } from '@liga-manager-api/graphql';

@Injectable({
    providedIn: 'root',
})
export class PitchService {

    allPitches$ = this.pitchesGQL
        .watch()
        .valueChanges.pipe(map(({ data }) => data.allPitches));

    constructor(private pitchesGQL: PitchesGQL) {}

}

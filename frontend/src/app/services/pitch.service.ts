import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pitch, PitchesGQL } from 'src/api/graphql';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  allPitches$ = this.pitchesGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allPitches)
  );

  constructor(
    private pitchesGQL: PitchesGQL,
  ) { }
}

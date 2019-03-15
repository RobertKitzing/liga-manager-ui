import { Injectable } from '@angular/core';
import { Pitch, PitchesGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  allPitches: Observable<Pitch.Fragment[]> = this.pitchesQGL.watch().valueChanges.pipe(
    map(({data}) => data.allPitches)
  );

  constructor(
    private pitchesQGL: PitchesGQL
  ) {
  }

}

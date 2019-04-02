import { Injectable } from '@angular/core';
import { Pitch, PitchesGQL, CreatePitchGQL, DeletePitchGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuidv4 from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  allPitches: Observable<Pitch.Fragment[]> = this.pitchesGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allPitches.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1))
  );

  constructor(
    private pitchesGQL: PitchesGQL,
    private createPitchGQL: CreatePitchGQL,
    private deletePitchGQL: DeletePitchGQL
  ) {
  }

  async deletePitch(pitchId: string): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.deletePitchGQL.mutate({
            pitch_id: pitchId
          },
            {
              refetchQueries: [
                {
                  query: this.pitchesGQL.document
                }
              ]
            }).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  async createNewPitch(pitch: Pitch.Fragment): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.createPitchGQL.mutate({
            id: uuidv4(),
            label: pitch.label,
            longitude: pitch.location_longitude,
            latitude: pitch.location_latitude
          },
            {
              refetchQueries: [
                {
                  query: this.pitchesGQL.document
                }
              ]
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}

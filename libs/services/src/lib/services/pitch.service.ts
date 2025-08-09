import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CreatePitchGQL, CreatePitchMutationVariables, PitchesGQL } from '@liga-manager-api/graphql';

@Injectable({
    providedIn: 'root',
})
export class PitchService {

    allPitches$ = this.pitchesGQL
        .watch()
        .valueChanges.pipe(map(({ data }) => data.allPitches));

    constructor(
        private pitchesGQL: PitchesGQL,
        private createPitchGQL: CreatePitchGQL,
    ) {}

    createPitch(variables: CreatePitchMutationVariables) {
        return this.createPitchGQL.mutate(variables, {
            refetchQueries: [
                {
                    query: this.pitchesGQL.document,
                },
            ],
        });
    }

}

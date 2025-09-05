import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CreatePitchGQL, CreatePitchMutationVariables, PitchesGQL } from '@liga-manager-api/graphql';

@Injectable({
    providedIn: 'root',
})
export class PitchService {

    private pitchesGQL = inject(PitchesGQL);

    private createPitchGQL = inject(CreatePitchGQL);

    allPitches$ = this.pitchesGQL
        .watch()
        .valueChanges.pipe(map(({ data }) => data.allPitches));

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

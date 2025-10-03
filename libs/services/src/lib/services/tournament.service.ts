import { inject, Injectable } from '@angular/core';
import {
    TournamentByIdGQL,
} from '@liga-manager-api/graphql';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    getTournamentById$(id: string) {
        return this.tournamentByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.tournament));
    }

}

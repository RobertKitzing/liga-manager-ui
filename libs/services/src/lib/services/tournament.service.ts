import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    TournamentByIdGQL,
    TournamentListGQL,
} from '@liga-manager-api/graphql';
import { SetTournaments } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private tournamentListGQL = inject(TournamentListGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    private destroyRef = inject(DestroyRef);

    private store = inject(Store);

    constructor() {
        this.tournamentListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetTournaments(result.data.allTournaments));
            },
        );
    }

    getTournamentById$(id: string) {
        return this.tournamentByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.tournament));
    }

}

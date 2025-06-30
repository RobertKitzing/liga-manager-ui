import { inject, Injectable } from '@angular/core';
import {
    AllTournamentListGQL,
    CreateTournamentGQL,
    DeleteTournamentGQL,
    Tournament,
    TournamentByIdGQL,
} from '@liga-manager-api/graphql';
import { map } from 'rxjs';
import { sortArrayBy } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private allTournamentListGQL = inject(AllTournamentListGQL);

    private createTournamentGQL = inject(CreateTournamentGQL);

    private deleteTournamentGQL = inject(DeleteTournamentGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    allTournaments$ = this.allTournamentListGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allTournaments),
        map((tournaments) =>
            sortArrayBy(tournaments as Tournament[], 'name', 'desc'),
        ),
    );

    createTournament(name: string) {
        return this.createTournamentGQL.mutate(
            {
                name,
            },
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                ],
            },
        );
    }

    deleteTournament(tournament_id: string) {
        return this.deleteTournamentGQL.mutate(
            {
                tournament_id,
            },
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                ],
            },
        );
    }

    getTournamentById$(id: string) {
        return this.tournamentByIdGQL
            .watch({ id })
            .valueChanges.pipe(map(({ data }) => data.tournament));
    }

    tournamentCompare(c1: Tournament, c2: Tournament) {
        return c1 && c2 && c1.id === c2.id;
    }

}

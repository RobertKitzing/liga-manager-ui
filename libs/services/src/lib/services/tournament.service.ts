import { inject, Injectable } from '@angular/core';
import {
    AllTournamentListGQL,
    CreateTournamentGQL,
    CreateTournamentRoundGQL,
    CreateTournamentRoundMutationVariables,
    DeleteTournamentGQL,
    EndTournamentGQL,
    StartTournamentGQL,
    Tournament,
    TournamentByIdGQL,
} from '@liga-manager-api/graphql';
import { map, take } from 'rxjs';
import { sortArrayBy } from '@liga-manager-ui/utils';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private allTournamentListGQL = inject(AllTournamentListGQL);

    private createTournamentGQL = inject(CreateTournamentGQL);

    private deleteTournamentGQL = inject(DeleteTournamentGQL);

    private startTournamentGQL = inject(StartTournamentGQL);

    private endTournamentGQL = inject(EndTournamentGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    private createTournamentRoundGQL = inject(CreateTournamentRoundGQL);

    allTournaments$ = this.allTournamentListGQL.watch().valueChanges.pipe(
        map(({ data }) => data.allTournaments),
        map((tournaments) =>
            sortArrayBy(tournaments as Tournament[], 'name', 'desc'),
        ),
    );

    reloadTournaments() {
        return this.allTournamentListGQL.fetch(undefined, { fetchPolicy: 'network-only' }).pipe(take(1));
    }

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

    startTournament(tournament_id: string) {
        return this.startTournamentGQL.mutate(
            {
                tournament_id,
            },
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                    {
                        query: this.tournamentByIdGQL.document, variables: { id: tournament_id },
                    },
                ],
            },
        );
    }

    endTournament(tournament_id: string) {
        return this.endTournamentGQL.mutate(
            {
                tournament_id,
            },
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                    {
                        query: this.tournamentByIdGQL.document, variables: { id: tournament_id },
                    },
                ],
            },
        );
    }

    createRound(params: CreateTournamentRoundMutationVariables) {
        return this.createTournamentRoundGQL.mutate(
            params,
            {
                refetchQueries: [
                    { query: this.allTournamentListGQL.document },
                    { query: this.tournamentByIdGQL.document, variables: { id: params.tournament_id } },
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

import { inject, Injectable } from '@angular/core';
import {
    CreateTournamentGQL,
    CreateTournamentRoundGQL,
    CreateTournamentRoundMutationVariables,
    DeleteTournamentGQL,
    EndTournamentGQL,
    StartTournamentGQL,
    TournamentByIdGQL,
} from '@liga-manager-api/graphql';
import { GetTournaments } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';
import { map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private store = inject(Store);

    private createTournamentGQL = inject(CreateTournamentGQL);

    private deleteTournamentGQL = inject(DeleteTournamentGQL);

    private startTournamentGQL = inject(StartTournamentGQL);

    private endTournamentGQL = inject(EndTournamentGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    private createTournamentRoundGQL = inject(CreateTournamentRoundGQL);

    createTournament(name: string) {
        return this.createTournamentGQL.mutate(
            {
                name,
            },
        ).pipe(
            tap(
                () => this.store.dispatch(new GetTournaments(true)),
            ),
        );
    }

    deleteTournament(tournament_id: string) {
        return this.deleteTournamentGQL.mutate(
            {
                tournament_id,
            },
        ).pipe(
            tap(
                () => this.store.dispatch(new GetTournaments(true)),
            ),
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
                        query: this.tournamentByIdGQL.document, variables: { id: tournament_id },
                    },
                ],
            },
        ).pipe(
            tap(
                () => this.store.dispatch(new GetTournaments(true)),
            ),
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
                        query: this.tournamentByIdGQL.document, variables: { id: tournament_id },
                    },
                ],
            },
        ).pipe(
            tap(
                () => this.store.dispatch(new GetTournaments(true)),
            ),
        );
    }

    createRound(params: CreateTournamentRoundMutationVariables) {
        return this.createTournamentRoundGQL.mutate(
            params,
            {
                refetchQueries: [
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

}

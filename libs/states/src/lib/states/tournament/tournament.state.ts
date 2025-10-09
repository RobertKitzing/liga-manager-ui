import { inject, Injectable } from '@angular/core';
import { CreateTournamentGQL, CreateTournamentRoundGQL, DeleteTournamentGQL, EndTournamentGQL, StartTournamentGQL, TournamentByIdGQL, TournamentListGQL, TournamentListQuery } from '@liga-manager-api/graphql';
import { Action, State, StateContext } from '@ngxs/store';
import { CreateTournament, CreateTournamentRound, DeleteTournament, EndTournament, SetTournaments, StartTournament } from './actions';
import { tap } from 'rxjs';
import { SetSelectedTournament } from '../selected-items';

export interface TournamentStateModel {
    tournaments: TournamentListQuery['allTournaments'];
}

@State<TournamentStateModel>({
    name: 'tournament',
    defaults: {
        tournaments: [],
    },
})
@Injectable()
export class TournamentState {

    private tournamentListGQL = inject(TournamentListGQL);

    private createTournamentGQL = inject(CreateTournamentGQL);

    private deleteTournamentGQL = inject(DeleteTournamentGQL);

    private startTournamentGQL = inject(StartTournamentGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    private endTournamentGQL = inject(EndTournamentGQL);

    private createTournamentRoundGQL = inject(CreateTournamentRoundGQL);

    @Action(SetTournaments)
    setSeason({ patchState }: StateContext<TournamentStateModel>, action: SetTournaments) {
        patchState({ tournaments: action.tournaments });
    }

    @Action(CreateTournament)
    createTournament(_: StateContext<TournamentStateModel>, action: CreateTournament) {
        return this.createTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.tournamentListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(DeleteTournament)
    deleteTournament(ctx: StateContext<TournamentStateModel>, action: DeleteTournament) {
        return this.deleteTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.tournamentListGQL.document,
                    },
                ],
            },
        ).pipe(
            tap(
                () => ctx.dispatch(new SetSelectedTournament('administration', undefined)),
            ),
        );
    }

    @Action(StartTournament)
    startTournament(_: StateContext<TournamentStateModel>, action: StartTournament) {
        return this.startTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.tournamentListGQL.document,
                    },
                    {
                        query: this.tournamentByIdGQL.document, variables: { id: action.payload.tournament_id },
                    },
                ],
            },
        );
    }

    @Action(EndTournament)
    endTournament(_: StateContext<TournamentStateModel>, action: EndTournament) {
        return this.endTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.tournamentListGQL.document,
                    },
                    {
                        query: this.tournamentByIdGQL.document, variables: { id: action.payload.tournament_id },
                    },
                ],
            },
        );
    }

    @Action(CreateTournamentRound)
    getTournamentRound(_: StateContext<TournamentStateModel>, action: CreateTournamentRound) {
        return this.createTournamentRoundGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    { query: this.tournamentByIdGQL.document, variables: { id: action.payload.tournament_id } },
                ],
            },
        );
    }

}

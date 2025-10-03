import { DestroyRef, inject, Injectable } from '@angular/core';
import { AllTournamentListGQL, AllTournamentListQuery, CreateTournamentGQL, CreateTournamentRoundGQL, DeleteTournamentGQL, EndTournamentGQL, StartTournamentGQL, TournamentByIdGQL } from '@liga-manager-api/graphql';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateTournament, CreateTournamentRound, DeleteTournament, EndTournament, StartTournament } from './actions';

export interface TournamentStateModel {
    tournaments: AllTournamentListQuery['allTournaments'];
}

@State<TournamentStateModel>({
    name: 'tournament',
    defaults: {
        tournaments: [],
    },
})
@Injectable()
export class TournamentState implements NgxsOnInit {

    private destroyRef = inject(DestroyRef);

    private allTournamentListGQL = inject(AllTournamentListGQL);

    private createTournamentGQL = inject(CreateTournamentGQL);

    private deleteTournamentGQL = inject(DeleteTournamentGQL);

    private startTournamentGQL = inject(StartTournamentGQL);

    private tournamentByIdGQL = inject(TournamentByIdGQL);

    private endTournamentGQL = inject(EndTournamentGQL);

    private createTournamentRoundGQL = inject(CreateTournamentRoundGQL);

    ngxsOnInit(ctx: StateContext<TournamentStateModel>): void {
        this.allTournamentListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                ctx.patchState({ tournaments: result.data.allTournaments });
            },
        );
    }

    @Action(CreateTournament)
    createTournament(_: StateContext<TournamentStateModel>, action: CreateTournament) {
        return this.createTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(DeleteTournament)
    deleteTournament(_: StateContext<TournamentStateModel>, action: DeleteTournament) {
        return this.deleteTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
                    },
                ],
            },
        );
    }

    @Action(StartTournament)
    startTournament(_: StateContext<TournamentStateModel>, action: StartTournament) {
        return this.startTournamentGQL.mutate(
            action.payload,
            {
                refetchQueries: [
                    {
                        query: this.allTournamentListGQL.document,
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
                        query: this.allTournamentListGQL.document,
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

import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllTournamentListGQL, AllTournamentsFragment, CreateTournamentGQL, CreateTournamentRoundGQL, CreateTournamentRoundMutationVariables, DeleteTournamentGQL, Tournament, TournamentGQL, TournamentQueryVariables } from 'src/api/graphql';
import { v4 as uuidv4 } from 'uuid';

const SELECTED_TOURNAMENT_KEY = 'SELECTED_TOURNAMENT';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  @LocalStorage(SELECTED_TOURNAMENT_KEY) _currentTournament: AllTournamentsFragment;
  currentTournament: BehaviorSubject<AllTournamentsFragment> = new BehaviorSubject<AllTournamentsFragment>(null);

  tournaments = this.allTournamentsGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allTournaments)
  );

  constructor(
    private allTournamentsGQL: AllTournamentListGQL,
    private tournamentGQL: TournamentGQL,
    private createRoundGQL: CreateTournamentRoundGQL,
    private createTournamentGQL: CreateTournamentGQL,
    private deleteTournamentGQL: DeleteTournamentGQL,
  ) {
    this.currentTournament.subscribe(
      (season) => {
        if (season) {
          this._currentTournament = season;
        }
      }
    );
    if (this._currentTournament) {
      this.currentTournament.next(this._currentTournament);
    }
  }

  getTournament(params: TournamentQueryVariables) {
    return this.tournamentGQL.watch(params).valueChanges.pipe(
      map(({ data }) => {
        const rounds = data.tournament?.rounds ? [...data.tournament.rounds] : null;
        if (rounds) {
          rounds.sort((a, b) => a.number < b.number ? 1 : -1);
        }
        return {
          ...data.tournament,
          rounds,
        };
      })
    );
  }

  createNewTournament(name: string) {
    return firstValueFrom(
      this.createTournamentGQL.mutate({
        id: uuidv4(),
        name: name
      },
        {
          refetchQueries: [
            { query: this.allTournamentsGQL.document }
          ]
        })
    );
  }

  createRound(params: CreateTournamentRoundMutationVariables) {
    return firstValueFrom(
      this.createRoundGQL.mutate(
        params,
        {
          refetchQueries: [
            { query: this.allTournamentsGQL.document },
            { query: this.tournamentGQL.document, variables: { id: params.tournament_id } }
          ]
        }
      )
    );
  }

  deleteTournament(tournament: Tournament) {
    return firstValueFrom(
      this.deleteTournamentGQL.mutate({
        tournament_id: tournament.id
      }, {
        refetchQueries: [
          { query: this.allTournamentsGQL.document}
        ]
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { AllTournamentListGQL, CreateTournamentGQL, DeleteTournamentGQL, TournamentByIdGQL } from '@api/graphql';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {

  allTournaments$ = this.allTournamentListGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allTournaments),
  );

  constructor(
    private allTournamentListGQL: AllTournamentListGQL,
    private createTournamentGQL: CreateTournamentGQL,
    private deleteTournamentGQL: DeleteTournamentGQL,
    private tournamentByIdGQL: TournamentByIdGQL,
  ) { }
  
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
    )
  }

  getTournamentById(id: string) {
    return this.tournamentByIdGQL.watch({ id }).valueChanges.pipe(
      map(({ data }) => data.tournament),
    )
  }

}

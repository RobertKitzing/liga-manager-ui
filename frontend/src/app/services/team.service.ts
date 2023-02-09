import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AllTeamsGQL, CreateTeamGQL, DeleteTeamGQL, DeleteTeamMutationVariables, RenameTeamGQL, RenameTeamMutationVariables } from 'src/api/graphql';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  allTeams$ = this.allTeamsGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allTeams),
    map((teams) => {
      return [...teams!].sort((a, b) => a?.name.toLocaleLowerCase()! >= b?.name.toLocaleLowerCase()! ? 1 : -1)
    })
  );

  constructor(
    private allTeamsGQL: AllTeamsGQL,
    private createTeamQL: CreateTeamGQL,
    private deleteTeamGQL: DeleteTeamGQL,
    private renameTeamGQL: RenameTeamGQL,
  ) { }

  createTeam(name: string) {
    return this.createTeamQL.mutate({
      id: uuidv4(),
      name
    },
      {
        refetchQueries: [
          {
            query: this.allTeamsGQL.document
          }
        ]
      }
    )
  }

  deleteTeam(variables: DeleteTeamMutationVariables) {
    return this.deleteTeamGQL.mutate(
      variables,
      {
        refetchQueries: [
          {
            query: this.allTeamsGQL.document
          }
        ]
      }
    )
  }

  renameTeam(variables: RenameTeamMutationVariables) {
    return this.renameTeamGQL.mutate(
      variables,
      {
        refetchQueries: [
          {
            query: this.allTeamsGQL.document
          }
        ]
      }
    )
  }
}

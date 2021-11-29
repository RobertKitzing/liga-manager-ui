import { Injectable } from '@angular/core';
import { CreateTeamGQL, AllTeamsGQL, RenameTeamGQL, TeamFragment, DeleteTeamGQL, TeamFragmentDoc, AddTeamToSeasonGQL, RemoveTeamFromSeasonGQL, SeasonGQL } from '../../api/graphql';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';

/**
 * Service to load/save everything related to Teams
 * @export
 * @class TeamService
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  allTeams = this.allTeamsGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allTeams),
    map((teams) => {
      const t = [...teams];
      return t.sort((a, b) => a.name.toLocaleLowerCase() >= b.name.toLocaleLowerCase() ? 1 : -1)
    })
  );

  constructor(
    private createTeamQL: CreateTeamGQL,
    private allTeamsGQL: AllTeamsGQL,
    private renameTeamGQL: RenameTeamGQL,
    private deleteTeamGQL: DeleteTeamGQL,
    private addTeamToSeasonGQL: AddTeamToSeasonGQL,
    private removeTeamGQL: RemoveTeamFromSeasonGQL,
    private seasonGQL: SeasonGQL,
  ) {
  }

  /**
   * Calls the API to create a new Team
   * @param {string} teamName
   * @returns {Promise<boolean>}
   * @memberof TeamService
   */
  addNewTeam(teamName: string) {
    return firstValueFrom(
      this.createTeamQL.mutate(
        {
          id: uuidv4(),
          name: teamName
        },
        {
          refetchQueries: [
            { query: this.allTeamsGQL.document }
          ]
        }
      ))
  }

  renameTeam(teamId: string, newName: string) {
    return firstValueFrom(
      this.renameTeamGQL.mutate(
        {
          team_id: teamId,
          new_name: newName
        },
        {
          update: (store, { data }) => {
            const team: any = store.readFragment(
              {
                fragmentName: 'Team',
                fragment: TeamFragmentDoc,
                id: `Team:${teamId}`
              }
            );
            store.writeFragment(
              {
                fragmentName: 'Team',
                fragment: TeamFragmentDoc,
                id: `Team:${teamId}`,
                data: {
                  __typename: 'Team',
                  ...team,
                  name: newName
                }
              }
            );
          },
        }
      ))
  }

  deleteTeam(team: TeamFragment) {
    return firstValueFrom(
      this.deleteTeamGQL.mutate(
        {
          team_id: team.id
        },
        {
          refetchQueries: [
            { query: this.allTeamsGQL.document }
          ]
        }
      ))
  }

  addTeamToSeason(team_id: string, season_id: string) {
    return firstValueFrom(
      this.addTeamToSeasonGQL.mutate(
        {
          season_id,
          team_id,
        },
        {
          refetchQueries: [
            {
              query: this.seasonGQL.document,
              variables: { id: season_id }
            }
          ]
        }
      ))
  }

  removeTeamFromSeason(team_id: string, season_id: string) {
    return firstValueFrom(
      this.removeTeamGQL.mutate(
        {
          season_id,
          team_id,
        },
        {
          refetchQueries: [
            {
              query: this.seasonGQL.document,
              variables: { id: season_id }
            }
          ]
        }
      ));
  }
}

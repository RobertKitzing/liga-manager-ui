import { Injectable } from '@angular/core';
import { CreateTeamGQL, Team, AllTeamsGQL, RenameTeamGQL, TeamFragment, DeleteTeamGQL } from '../../api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

/**
 * Service to load/save everything related to Teams
 * @export
 * @class TeamService
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  allTeams: Observable<Team.Fragment[]> = this.allTeamsGQL.watch().valueChanges.pipe(
    map(({data}) => data.allTeams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
  );

  constructor(
    private createTeamQL: CreateTeamGQL,
    private allTeamsGQL: AllTeamsGQL,
    private renameTeamGQL: RenameTeamGQL,
    private deleteTeamGQL: DeleteTeamGQL
  ) {
  }

  /**
   * Calls the API to create a new Team
   * @param {string} teamName
   * @returns {Promise<boolean>}
   * @memberof TeamService
   */
  addNewTeam(teamName: string): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        if (!teamName) {
          reject(new Error('Empty Teamname'));
        }
        try {
          await this.createTeamQL.mutate(
            {
              id: uuid(),
              name: teamName
            },
            {
              refetchQueries: [
                {query: this.allTeamsGQL.document}
              ]
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  renameTeam(teamId: string, newName: string): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.renameTeamGQL.mutate(
            {
              team_id: teamId,
              new_name: newName
            },
            {
              update: (store, { data }) => {
                const team: any = store.readFragment(
                  {
                    fragmentName: 'Team',
                    fragment: TeamFragment,
                    id: `Team:${teamId}`
                  }
                );
                store.writeFragment(
                  {
                    fragmentName: 'Team',
                    fragment: TeamFragment,
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
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  deleteTeam(team: Team.Fragment): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.deleteTeamGQL.mutate(
            {
              team_id: team.id
            },
            {
              refetchQueries: [
                {query: this.allTeamsGQL.document}
              ]
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}

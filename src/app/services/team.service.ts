import { Injectable } from '@angular/core';
import { TeamsGQL, Team, AllTeamsGQL, RenameTeamGQL, TeamFragment } from '../../api/graphql';
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
    private teamsQL: TeamsGQL,
    private allTeamsGQL: AllTeamsGQL,
    private renameTeamGQL: RenameTeamGQL
  ) {
  }

  /**
   * Calls the API to create a new Team
   * @param {string} teamName
   * @returns {Promise<boolean>}
   * @memberof TeamService
   */
  async addNewTeam(teamName: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        if (!teamName) {
          reject(new Error('Empty Teamname'));
        }
        this.teamsQL.mutate(
          {
            id: uuid(),
            name: teamName
          },
          {
            refetchQueries: [
              {query: this.allTeamsGQL.document}
            ]
          }
        ).subscribe(
          (result) => {
            resolve();
          },
            (error) => {
              reject(error);
            }
        );
      }
    );
  }

  async renameTeam(teamId: string, newName: string): Promise<void> {
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

  deleteTeam(team: Team.Fragment): any {
    throw new Error("Method not implemented.");
  }
}

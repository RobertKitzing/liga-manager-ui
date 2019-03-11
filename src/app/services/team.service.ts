import { Injectable } from '@angular/core';
import { TeamsGQL, Team, AllTeamsGQL } from '../../api/graphql';
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
    private allTeamsGQL: AllTeamsGQL
  ) {
  }

  /**
   * Calls the API to create a new Team
   * @param {string} teamName
   * @returns {Promise<boolean>}
   * @memberof TeamService
   */
  async addNewTeam(teamName: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        if (!teamName) {
          resolve(false);
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
          async (result) => {
            resolve(true);
          },
            (error) => {
              console.error(error);
              resolve(false);
            }
        );
      }
    );
  }
}

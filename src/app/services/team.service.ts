import { Injectable } from '@angular/core';
import { Team, Client, CreateTeamBody, Contact_person } from '../../api';
import { TeamsGQL } from '../../api/graphql';

interface CacheTeamsInSeason {
  seasonId: string;
  teams: Team[];
}
/**
 * Service to load/save everything related to Teams
 * @export
 * @class TeamService
 */
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  /**
   * Returns a List of Teams from localStorage
   * @type {Team[]}
   * @memberof TeamService
   */
  public get teams(): Team[] {
    return JSON.parse(localStorage.getItem('TEAMS')) || null;
  }

  /**
   * Stores a List of Teams to localStorage
   * @memberof TeamService
   */
  public set teams(value: Team[]) {
    localStorage.setItem('TEAMS', JSON.stringify(value));
  }

  constructor(
    private apiClient: Client,
    private teamsQL: TeamsGQL) {
  }

  /**
   * Returns a Contact_person for given teamID or an empty Contact_person if no Team was found
   * @param {string} id
   * @returns {Contact_person}
   * @memberof TeamService
   */
  getTeamContactByID(id: string): Contact_person {
    const team: Team = this.teams.find(t => t.id === id);
    return team.contact || <Contact_person>{
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    };
  }

  /**
   * Returns a Team for given teamId or an empty Team
   * @param {string} id
   * @returns {Team}
   * @memberof TeamService
   */
  getTeamById(id: string): Team {
    if (this.teams) {
      return this.teams.find(t => t.id === id);
    } else {
      return new Team();
    }
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
        this.teams = null;
        this.teamsQL.mutate(
          {
            name: teamName
          }
        ).subscribe(
          async (result) => {
            this.teams = await this.loadAllTeams();
          },
            (error) => {
              console.error(error);
              resolve(false);
            }
        );
        // const createTeamParams: CreateTeamBody = new CreateTeamBody();
        // createTeamParams.name = teamName;
        // this.apiClient.createTeam(createTeamParams).subscribe(
        //   async () => {
        //     this.teams = await this.loadAllTeams();

        //   },
        //   (error) => {
        //     resolve(false);
        //   }
        // );
      }
    );
  }

  /**
   * Initial load of all Teams (should only be called in APP_INITIALIZER)
   * @memberof TeamService
   */
  public async initLoadTeams() {
    this.teams = await this.loadAllTeams();
  }

  public async loadAllTeams(): Promise<Team[]> {
    return new Promise<Team[]>(
      (resolve) => {
        this.apiClient.getAllTeams().subscribe(
          (teams) => {
            resolve(teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          },
          (error) => {
            resolve(this.teams);
          }
        );
      }
    );
  }

  /**
   * Returns an Team[] for an Season.
   * With a Cache Mechanism, it Stores an CacheTeamsInSeason[] in localStorage
   * @param {string} seasonId
   * @returns {Promise<Team[]>}
   * @memberof TeamService
   */
  public async loadTeamsInSeason(seasonId: string): Promise<Team[]> {
    return new Promise<Team[]>(
      (resolve, reject) => {
        let cache: CacheTeamsInSeason[] = JSON.parse(localStorage.getItem('CACHE_TEAMS_IN_SEASON'));
        this.apiClient.getTeamsInSeason(seasonId).subscribe(
          (teams) => {
            if (!cache) {
              cache = new Array<CacheTeamsInSeason>();
            } else {
              cache = cache.filter(t => t.seasonId !== seasonId);
            }
            cache.push({
              seasonId: seasonId,
              teams: teams
            });
            localStorage.setItem('CACHE_TEAMS_IN_SEASON', JSON.stringify(cache));
            resolve(teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
          },
          (error) => {
            if (cache) {
              const teams = cache.find(t => t.seasonId === seasonId);
              if (teams) {
                resolve(teams.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
              } else {
                reject(error);
              }
            } else {
              reject(error);
            }
          }
        );
      }
    );
  }

  /**
   * Loads an Team from API
   * @param {string} teamId
   * @returns {Promise<Team>}
   * @memberof TeamService
   */
  public async getSingleTeam(teamId: string): Promise<Team> {
    return new Promise<Team>(
      (resolve, reject) => {
        this.apiClient.getTeam(teamId).subscribe(
          (team) => {
            resolve(team);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}

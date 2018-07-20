import { Injectable } from '@angular/core';
import { Client, Match } from 'src/api';
import { MatchViewModel } from '../models/match.viewmodel';
import { TeamService } from './team.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private apiClient: Client, private teamService: TeamService) { }

  public async getMatchesInSeason(seasonId: string, matchDay: number): Promise<MatchViewModel[]> {
    return new Promise<MatchViewModel[]>(
      (resolve) => {
        this.apiClient.getMatchesInSeason(seasonId, matchDay).subscribe(
          (matches) => {
            const mvwa = new Array<MatchViewModel>();
            matches.forEach((match) => {
              const mv = new MatchViewModel(match);
              mv.home_team_name = this.teamService.getTeamById(mv.home_team_id);
              mv.guest_team_name = this.teamService.getTeamById(mv.guest_team_id);
              mvwa.push(mv);
            });
            resolve(mvwa);
          }
        );
      }
    );
  }
}

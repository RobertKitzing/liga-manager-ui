import { Injectable } from '@angular/core';
import { Client, Match, SubmitMatchResultBody } from 'src/api';
import { MatchViewModel } from '../models/match.viewmodel';
import { TeamService } from './team.service';
import { PitchService } from './pitch.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(
    private apiClient: Client,
    private teamService: TeamService,
    private pitchService: PitchService) { }

  public async getMatchesInSeason(seasonId: string, matchDay: number): Promise<MatchViewModel[]> {
    // TODO: Umbauen auf Observable
    return new Promise<MatchViewModel[]>(
      (resolve) => {
        this.apiClient.getMatchesInSeason(seasonId, matchDay).subscribe(
          (matches) => {
            const mvwa = new Array<MatchViewModel>();
            matches.forEach((match) => {
              const mv = new MatchViewModel(match);
              mv.home_team = this.teamService.getTeamById(mv.home_team_id);
              mv.guest_team = this.teamService.getTeamById(mv.guest_team_id);
              mv.pitch = this.pitchService.getPitchById(mv.pitch_id);
              mvwa.push(mv);
            });
            resolve(mvwa);
          }
        );
      }
    );
  }

  submitMatchResult(matchId: string, homeScore: number, guestScore: number) {
    const matchResult = new SubmitMatchResultBody();
    matchResult.guest_score = guestScore;
    matchResult.home_score = homeScore;
    this.apiClient.submitMatchResult(matchId, matchResult).toPromise();
  }
}

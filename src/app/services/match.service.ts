import { Injectable } from '@angular/core';
import { Client, Match, SubmitMatchResultBody } from '../../api';
import { MatchViewModel } from '../models/match.viewmodel';
import { TeamService } from './team.service';
import { PitchService } from './pitch.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public matchUpdated: Subject<string> = new Subject<string>();

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
            resolve(this.matchConverterArray(matches));
          }
        );
      }
    );
  }

  matchConverter(match: Match): MatchViewModel {
    const mv = new MatchViewModel(match);
    mv.home_team = this.teamService.getTeamById(mv.home_team_id);
    mv.guest_team = this.teamService.getTeamById(mv.guest_team_id);
    mv.pitch = this.pitchService.getPitchById(mv.pitch_id);
    return mv;
  }

  matchConverterArray(matches: Match[]): MatchViewModel[] {
    const mvwa = new Array<MatchViewModel>();
    matches.forEach((match) => {
      mvwa.push(this.matchConverter(match));
    });
    return mvwa;
  }

  submitMatchResult(matchId: string, homeScore: number, guestScore: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        const matchResult = new SubmitMatchResultBody();
        matchResult.guest_score = guestScore;
        matchResult.home_score = homeScore;
        this.apiClient.submitMatchResult(matchId, matchResult).subscribe(
          (b) => {
            this.matchUpdated.next(matchId);
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
      }
    );
  }

  updateSingleMatch(matchId: string): Promise<MatchViewModel> {
    return new Promise<MatchViewModel>(
      (resolve) => {
        this.apiClient.getMatch(matchId).subscribe(
          (match) => {
            resolve(this.matchConverter(match));
          }
        );
      }
    );
  }
}

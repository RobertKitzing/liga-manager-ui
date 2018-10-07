import { Injectable } from '@angular/core';
import { Client, Match, SubmitMatchResultBody } from '../../api';
import { MatchViewModel } from '../models/match.viewmodel';
import { TeamService } from './team.service';
import { PitchService } from './pitch.service';
import { Subject } from 'rxjs';

export interface MatchUpdateMessage {
  matchId: string;
  homeTeamName: string;
  guestTeamName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  public matchUpdated: Subject<MatchUpdateMessage> = new Subject<MatchUpdateMessage>();

  constructor(
    private apiClient: Client,
    private teamService: TeamService,
    private pitchService: PitchService) { }

  // tslint:disable-next-line:max-line-length
  public async getMatchesInSeason(seasonId: string, teamId?: string, matchDayId?: string): Promise<MatchViewModel[]> {
    // TODO: Umbauen auf Observable
    return new Promise<MatchViewModel[]>(
      (resolve) => {
        this.apiClient.getMatches(seasonId, null, teamId, matchDayId).subscribe(
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
    if (mv.kickoff) {
      mv.kickoff.setMinutes(mv.kickoff.getMinutes() - mv.kickoff.getTimezoneOffset());
    }
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

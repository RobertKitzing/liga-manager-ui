import { Injectable } from '@angular/core';
import { Client, Match, SubmitMatchResultBody, Match_day } from '../../api';
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
    return new Promise<MatchViewModel[]>(
      (resolve, reject) => {
        if (!teamId) {
          teamId = undefined;
        }
        if (!matchDayId) {
          matchDayId = undefined;
        }
        this.apiClient.getMatches(seasonId, undefined, teamId, matchDayId).subscribe(
          (matches) => {
            resolve(this.matchConverterArray(matches));
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  public async getMatchDaysInSeason(seasonId: string): Promise<Match_day[]> {
    return new Promise<Match_day[]>(
      (resolve, reject) => {
        this.apiClient.getMatchDaysInSeason(seasonId).subscribe(
          (matchDays) => {
            resolve(matchDays);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // tslint:disable-next-line:max-line-length
  public async getMatchesInTournament(tournamentId: string, teamId?: string, matchDayId?: string): Promise<MatchViewModel[]> {
    return new Promise<MatchViewModel[]>(
      (resolve, reject) => {
        if (!teamId) {
          teamId = undefined;
        }
        if (!matchDayId) {
          matchDayId = undefined;
        }
        this.apiClient.getMatches(undefined, tournamentId, teamId, matchDayId).subscribe(
          (matches) => {
            resolve(this.matchConverterArray(matches));
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  public async getRoundsInTournament(tournamentId: string): Promise<Match_day[]> {
    return new Promise<Match_day[]>(
      (resolve, reject) => {
        this.apiClient.getRoundsInTournament(tournamentId).subscribe(
          (matchDays) => {
            resolve(matchDays);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // public async cancelMatch(matchId: string) {
  //   return new Promise<
  // }

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

  public isMatchPlayed(match: Match): boolean {
    return this.isValidResult(match.home_score) && this.isValidResult(match.guest_score);
  }

  public isValidResult(score: number): boolean {
    return typeof score === 'number' && score >= 0;
  }

  submitMatchResult(matchId: string, homeScore: number, guestScore: number): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        const matchResult = new SubmitMatchResultBody();
        matchResult.guest_score = guestScore;
        matchResult.home_score = homeScore;
        this.apiClient.submitMatchResult(matchId, matchResult).subscribe(
          (b) => {
            resolve();
          },
          (error) => {
            reject(error);
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

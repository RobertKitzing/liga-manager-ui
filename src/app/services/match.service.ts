import { Injectable } from '@angular/core';
import { Client, Match, Match_day } from '../../api';
import { MatchViewModel } from '../models/match.viewmodel';
import { TeamService } from './team.service';
import { PitchService } from './pitch.service';
import { Subject } from 'rxjs';
import { SubmitResultGQL, RankingGQL, MatchFragment, ScheduleMatchGQL, LocateMatchGQL } from '../../api/graphql';
import { SeasonService } from './season.service';

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
    private pitchService: PitchService,
    private submitResultGQL: SubmitResultGQL,
    private rankingQGL: RankingGQL,
    private scheduleMatchGQL: ScheduleMatchGQL,
    private locateMatchQGL: LocateMatchGQL,
    private seasonService: SeasonService
  ) { }

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
    const result = { home_score: homeScore, guest_score: guestScore };
    return new Promise<void>(
      (resolve, reject) => {
        this.submitResultGQL.mutate(
          {
            match_id: matchId,
            ...result
          },
          {
            update: (store, { data }) => {
              const match: any = store.readFragment(
                {
                  fragment: MatchFragment,
                  id: `Match:${matchId}`
                }
              );
              store.writeFragment(
                {
                  fragment: MatchFragment,
                  id: `Match:${matchId}`,
                  data: {
                    __typename: 'Match',
                    ...match,
                    ...result
                  }
                }
              );
            },
            refetchQueries: [
              {
                query: this.rankingQGL.document,
                variables: {
                  id: this.seasonService.currentSeason.getValue().id
                }
              }
            ]
          }
        ).subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  scheduleMatch(matchId: string, matchKickoff: Date): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.scheduleMatchGQL.mutate(
          {
            match_id: matchId,
            kickoff: matchKickoff.toISOString()
          },
          {
            update: (store, { data }) => {
              const match: any = store.readFragment(
                {
                  fragment: MatchFragment,
                  id: `Match:${matchId}`
                }
              );
              store.writeFragment(
                {
                  fragment: MatchFragment,
                  id: `Match:${matchId}`,
                  data: {
                    __typename: 'Match',
                    ...match,
                    kickoff: matchKickoff
                  }
                }
              );
            }
          }
        ).subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  locateMatch(matchId: string, pitchId: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.locateMatchQGL.mutate(
          {
            match_id: matchId,
            pitch_id: pitchId
          },
          {
            // update: (store, { data }) => {
            //   const match: any = store.readFragment(
            //     {
            //       fragment: MatchFragment,
            //       id: `Match:${matchId}`
            //     }
            //   );
            //   store.writeFragment(
            //     {
            //       fragment: MatchFragment,
            //       id: `Match:${matchId}`,
            //       data: {
            //         __typename: 'Match',
            //         ...match,
            //         pit
            //       }
            //     }
            //   );
            // }
          }
        ).subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { SubmitResultGQL, MatchFragment, ScheduleMatchGQL, LocateMatchGQL, Match, Pitch, ScheduleAllMatchesForSeasonGQL, MatchAppointment, MatchPlanGQL } from '../../api/graphql';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  seasonMatchUpdated = new Subject<{ seasonId, matchId }>();
  tournamentMatchUpdated = new Subject<{ tournamentId, matchId }>();

  constructor(
    private submitResultGQL: SubmitResultGQL,
    private scheduleMatchGQL: ScheduleMatchGQL,
    private scheduleAllMatchesForSeasonGQL: ScheduleAllMatchesForSeasonGQL,
    private locateMatchQGL: LocateMatchGQL,
    private matchPlanGQL: MatchPlanGQL,
  ) { }

  public isMatchPlayed(match: Match.Fragment): boolean {
    return this.isValidResult(match.home_score) && this.isValidResult(match.guest_score);
  }

  public isValidResult(score: number): boolean {
    return typeof score === 'number' && score >= 0;
  }

  submitMatchResult(matchId: string, homeScore: number, guestScore: number): Promise<void> {
    const result = { home_score: homeScore, guest_score: guestScore };
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.submitResultGQL.mutate(
            {
              match_id: matchId,
              ...result
            },
            {
              update: (store, { data }) => {
                const match: any = store.readFragment(
                  {
                    fragmentName: 'Match',
                    fragment: MatchFragment,
                    id: `Match:${matchId}`
                  }
                );
                store.writeFragment(
                  {
                    fragmentName: 'Match',
                    fragment: MatchFragment,
                    id: `Match:${matchId}`,
                    data: {
                      __typename: 'Match',
                      ...match,
                      ...result
                    }
                  }
                );
              }
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  }

  scheduleAllMatchesInSeason(season_id: string, match_appointments: MatchAppointment[]) {
    return new Promise<void>(
      (resolve, reject) => {
        this.scheduleAllMatchesForSeasonGQL.mutate(
          {
            season_id,
            match_appointments
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: {
                  id: season_id,
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

  scheduleMatch(matchId: string, matchKickoff: Date | string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        const kickoff = typeof matchKickoff === 'string' ? matchKickoff : matchKickoff.toISOString();
        this.scheduleMatchGQL.mutate(
          {
            match_id: matchId,
            kickoff: kickoff
          },
          {
            update: (store, { data }) => {
              const match: any = store.readFragment(
                {
                  fragmentName: 'Match',
                  fragment: MatchFragment,
                  id: `Match:${matchId}`
                }
              );
              store.writeFragment(
                {
                  fragmentName: 'Match',
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

  locateMatch(matchId: string, pitch: Pitch.Fragment): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.locateMatchQGL.mutate(
          {
            match_id: matchId,
            pitch_id: pitch.id
          },
          {
            update: (store, { data }) => {
              const match: any = store.readFragment(
                {
                  fragmentName: 'Match',
                  fragment: MatchFragment,
                  id: `Match:${matchId}`
                }
              );
              store.writeFragment(
                {
                  fragmentName: 'Match',
                  fragment: MatchFragment,
                  id: `Match:${matchId}`,
                  data: {
                    __typename: 'Match',
                    ...match,
                    pitch: pitch
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
}

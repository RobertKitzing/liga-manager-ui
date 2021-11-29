import { Injectable } from '@angular/core';
import { SubmitResultGQL, ScheduleMatchGQL, LocateMatchGQL, Match, Pitch, ScheduleAllMatchesForSeasonGQL, MatchAppointment, SeasonGQL, ScheduleAllMatchesForMatchDayGQL, MatchFragmentDoc, CancelMatchGQL } from '../../api/graphql';
import { Subject } from 'rxjs';
import { SeasonService } from './season.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private submitResultGQL: SubmitResultGQL,
    private scheduleMatchGQL: ScheduleMatchGQL,
    private scheduleAllMatchesForSeasonGQL: ScheduleAllMatchesForSeasonGQL,
    private scheduleAllMatchesForMatchDayGQL: ScheduleAllMatchesForMatchDayGQL,
    private locateMatchQGL: LocateMatchGQL,
    private seasonGQL: SeasonGQL,
    private cancelMatchGQL: CancelMatchGQL,
    private seasonService: SeasonService,
  ) { }

  public isMatchPlayed(match: Match): boolean {
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
                    fragment: MatchFragmentDoc,
                    id: `Match:${matchId}`
                  }
                );
                store.writeFragment(
                  {
                    fragmentName: 'Match',
                    fragment: MatchFragmentDoc,
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
        try {
          this.scheduleAllMatchesForSeasonGQL.mutate(
            {
              season_id,
              match_appointments
            },
            {
              refetchQueries: [
                {
                  query: this.seasonGQL.document,
                  variables: {
                    id: season_id,
                  }
                }
              ]
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  }

  scheduleAllMatchesForMatchday(match_day_id: string, season_id: string, match_appointments: MatchAppointment[]) {
    return new Promise<void>(
      (resolve, reject) => {
        try {
          this.scheduleAllMatchesForMatchDayGQL.mutate(
            {
              match_day_id,
              match_appointments
            },
            {
              refetchQueries: [
                {
                  query: this.seasonGQL.document,
                  variables: {
                    id: season_id,
                  }
                }
              ]
            }
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  }

  scheduleMatch(matchId: string, matchKickoff: Date | string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        try {
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
                    fragment: MatchFragmentDoc,
                    id: `Match:${matchId}`
                  }
                );
                store.writeFragment(
                  {
                    fragmentName: 'Match',
                    fragment: MatchFragmentDoc,
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
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  }

  locateMatch(matchId: string, pitch: Pitch): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        try {
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
                    fragment: MatchFragmentDoc,
                    id: `Match:${matchId}`
                  }
                );
                store.writeFragment(
                  {
                    fragmentName: 'Match',
                    fragment: MatchFragmentDoc,
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
          ).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  }

  cancelMatch(match_id: string, reason: string): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          await this.cancelMatchGQL.mutate({
            match_id,
            reason,
          }, {
            refetchQueries: [
              {
                query: this.seasonGQL.document,
                variables: { id: this.seasonService.currentSeason.getValue().id }
              }
            ]
          }).toPromise();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}

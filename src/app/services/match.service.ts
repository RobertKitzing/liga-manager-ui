import { Injectable } from '@angular/core';
import { SubmitResultGQL, RankingGQL, MatchFragment, ScheduleMatchGQL, LocateMatchGQL, MatchPlanGQL, Match, Pitch } from '../../api/graphql';
import { SeasonService } from './season.service';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private submitResultGQL: SubmitResultGQL,
    private rankingQGL: RankingGQL,
    private scheduleMatchGQL: ScheduleMatchGQL,
    private locateMatchQGL: LocateMatchGQL,
    private seasonService: SeasonService,
    private matchPlanGQL: MatchPlanGQL
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
      (resolve, reject) => {
        this.submitResultGQL.mutate(
          {
            match_id: matchId,
            ...result
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

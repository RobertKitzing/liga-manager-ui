import { Injectable } from '@angular/core';
import { LocateMatchGQL, LocateMatchMutationVariables, Pitch, RankingGQL, ScheduleMatchGQL, ScheduleMatchMutationVariables, SeasonGQL, SubmitResultGQL, SubmitResultMutationVariables } from 'src/api/graphql';
import { SeasonService } from './season.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private submitResultGQL: SubmitResultGQL,
    private seasonGQL: SeasonGQL,
    private seasonService: SeasonService,
    private rankingGQL: RankingGQL,
    private locateMatchQGL: LocateMatchGQL,
    private scheduleMatchGQL: ScheduleMatchGQL,
  ) { }

  submitMatchResult(variables: SubmitResultMutationVariables) {
    const seasonId = this.seasonService.currentSeason$.getValue();
    return this.submitResultGQL.mutate(variables, {
      refetchQueries: [
        {
          query: this.seasonGQL.document, variables: {id: seasonId.id }
        },
        {
          query: this.rankingGQL.document, variables: {id: seasonId.id }
        }
      ]
    })
  }

  locateMatch(variables: LocateMatchMutationVariables) {
    const seasonId = this.seasonService.currentSeason$.getValue();
    return this.locateMatchQGL.mutate(variables, {
      refetchQueries: [
        {
          query: this.seasonGQL.document, variables: {id: seasonId.id }
        },
      ]
    })
  }

  scheduleMatch(variables: ScheduleMatchMutationVariables) {
    const seasonId = this.seasonService.currentSeason$.getValue();
    return this.scheduleMatchGQL.mutate(variables, {
      refetchQueries: [
        {
          query: this.seasonGQL.document, variables: {id: seasonId.id }
        },
      ]
    })
  }
}

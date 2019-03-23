import { Injectable } from '@angular/core';
import { RedisEventGQL } from 'src/api/graphqlsubs';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { RankingGQL, LatestEventGQL, MatchPlanGQL, MatchGQL } from '../../api/graphql';
import { SeasonService } from './season.service';

export interface MatchEventPayload {
  matchId: string;
  homeScore: number;
  guestScore: number;
  userId: string;
}

@Injectable({
  providedIn: 'root',
  useExisting: GraphqlSubscriptionService
})
export class GraphqlSubscriptionService {

  private _subscriptionClient: SubscriptionClient;
  public get subscriptionClient(): SubscriptionClient {
    return this._subscriptionClient;
  }
  public set subscriptionClient(value: SubscriptionClient) {
    this._subscriptionClient = value;
    if (value) {
      this.subscriptionClient.onConnected(
        () => {
          console.log('connected');
        }
      );
      this.subscriptionClient.onConnecting(
        () => {
          console.log('connecting');
        }
      );
      this.subscriptionClient.onError(
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  constructor(
    private redis: RedisEventGQL,
    private rankingQGL: RankingGQL,
    private eventsGQL: LatestEventGQL,
    private matchQGL: MatchGQL,
    private matchPlanGQL: MatchPlanGQL,
    private seasonService: SeasonService
  ) {
  }

  connect() {
    this.redis.subscribe().subscribe(
      async (message) => {
        if (message.data) {
          console.log(message.data);
          // await this.eventsGQL.fetch(null, {
          //   fetchPolicy: 'network-only'
          // }).toPromise();
          const msgType: string[] = message.data.redisevent.type.split(':');
          const payload: MatchEventPayload = JSON.parse(message.data.redisevent.payload);
          if (msgType[0] === 'match') {
            await this.matchQGL.fetch({ id: payload.matchId }).toPromise();
            // await this.matchPlanGQL.fetch({id: this.seasonService.currentSeason.getValue().id}).toPromise();
          }
        }

      },
      (error) => {
        console.error(error);
      }
    );
  }
}

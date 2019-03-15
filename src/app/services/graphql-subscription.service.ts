import { Injectable } from '@angular/core';
import { RedisEventGQL } from 'src/api/graphqlsubs';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { RankingGQL, LatestEventGQL } from '../../api/graphql';

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
    private eventsGQL: LatestEventGQL
  ) {
  }

  connect() {
    this.redis.subscribe().subscribe(
      async (message) => {
        if (message.data) {
          console.log(message.data);
          await this.eventsGQL.fetch(null, {
            fetchPolicy: 'network-only'
          }).toPromise();
        }

      },
      (error) => {
        console.error(error);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppsettingsService } from './appsettings.service';
import { ApolloLink, split } from 'apollo-link';
import { AuthenticationService } from './authentication.service';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { persistCache } from 'apollo-cache-persist';
import { GraphqlSubscriptionService } from './graphql-subscription.service';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthenticationService,
    private appsettingsService: AppsettingsService,
    private graphqlSubscriptionService: GraphqlSubscriptionService
  ) {
  }

  createApolloLink() {
    const http = this.httpLink.create({ uri: this.appsettingsService.appsettings.graphqlUrl });

    const afterwareLink = new ApolloLink((operation, forward) => {
      return forward(operation).map(response => {
        const { response: { headers } } = operation.getContext();
        if (response.errors && response.errors.some(x => x.message.includes('Unauthenticated'))) {
          this.authService.logout();
        }
        if (headers) {
          const token = headers.get('x-token');
          if (token) {
            this.authService.accessToken = token;
          }
        }
        return response;
      });
    });

    const auth = setContext((_, { headers }) => {
      if (!headers) {
        headers = new HttpHeaders();
      }
      const token = this.authService.accessToken;
      if (token) {
        return {
          headers: headers.get('Authorization') ? null : headers.append('Authorization', `Bearer ${token}`)
        };
      } else {
        return {};
      }
    });

    this.graphqlSubscriptionService.subscriptionClient = new SubscriptionClient(
      this.appsettingsService.appsettings.graphqlWsUrl,
      {
        lazy: true,
        reconnect: true,
        reconnectionAttempts: 2
      });
    const wsClient = new WebSocketLink(this.graphqlSubscriptionService.subscriptionClient);

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsClient,
      afterwareLink.concat(auth).concat(http),
    );

    const cache = new InMemoryCache(
      {
        addTypename: true,
        cacheRedirects: {
          Query: {
            allSeasons: (t, args, { getCacheKey }) => {
              return getCacheKey({ __typename: 'Season' });
            }
          },
        }
      }
    );
    if (environment.persistCache) {
      persistCache({
        cache,
        storage: window.localStorage,
        key: 'graphql-cache'
      });
    }
    this.apollo.create({
      link: link,
      cache: cache
    });
  }
}

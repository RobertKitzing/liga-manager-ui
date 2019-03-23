import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { getMainDefinition } from 'apollo-utilities';
import { AuthenticationService } from './services/authentication.service';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { environment } from '../environments/environment';
import { GraphqlSubscriptionService } from 'src/app/services/graphql-subscription.service';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const uri = environment.graphqlUrl; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, authService: AuthenticationService, ownService: GraphqlSubscriptionService) {
  const http = httpLink.create({ uri });
  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      const { response: { headers } } = operation.getContext();
      if (response.errors && response.errors.some(x => x.message.includes('Unauthenticated')) ) {
        authService.logout();
      }
      if (headers) {
        const token = headers.get('x-token');
        if (token) {
          authService.setAccessToken({ token: token });
        }
      }
      return response;
    });
  });

  const auth = setContext((_, { headers }) => {
    if (!headers) {
      headers = new HttpHeaders();
    }
    const token = authService.accessToken;
    if (token) {
      return {
        headers: headers.get('Authorization') ? null : headers.append('Authorization', `Bearer ${token}`)
      };
    } else {
      return {};
    }
  });

  ownService.subscriptionClient = new SubscriptionClient(
    environment.graphqlWsUrl,
    {
      lazy: true,
      reconnect: true,
      reconnectionAttempts: 2
    });
  const wsClient = new WebSocketLink(ownService.subscriptionClient);

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
      addTypename: true
    }
  );
  persistCache({
    cache,
    storage: window.localStorage,
    key: 'graphql-cache',
    debug: !environment.production
  });
  return {
    link: link,
    cache: cache,
    connectToDevTools: !environment.production
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    GraphqlSubscriptionService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        AuthenticationService,
        GraphqlSubscriptionService
      ],
    },
  ],
})
export class GraphQLModule { }

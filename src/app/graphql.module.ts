import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { toIdValue, getMainDefinition } from 'apollo-utilities';
import { AuthenticationService, Credentials } from './services/authentication.service';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { environment } from '../environments/environment';

const uri = environment.graphqlUrl; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, authService: AuthenticationService) {
  const http = httpLink.create({ uri });
  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      const { response: { headers } } = operation.getContext();
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
  const wsClient = new WebSocketLink({
    uri: environment.graphqlWsUrl,
    options: {
      reconnect: true,
      lazy: true,
      reconnectionAttempts: 5,
      inactivityTimeout: 3000
    },
  });
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
      cacheRedirects: {
        Query: {
          season: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Season', id: args.id }))
        },
      },
      addTypename: true
    }
  );
  return {
    link: link,
    cache: cache
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        AuthenticationService
      ],
    },
  ],
})
export class GraphQLModule { }

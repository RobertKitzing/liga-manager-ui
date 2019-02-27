import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { toIdValue, getMainDefinition } from 'apollo-utilities';
import { AuthenticationService } from './services/authentication.service';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

const uri = 'api/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });
  const auth = setContext((_, { headers }) => {
    if (!headers) {
      headers = new HttpHeaders();
    }
    // get the authentication token from local storage if it exists
    const token = null;
    // return the headers to the context so httpLink can read them
    // in this example we assume headers property exists
    // and it is an instance of HttpHeaders
    if (!token) {
      return {};
    } else {
      return {
        headers: headers.append('Authorization', `Bearer ${token}`)
      };
    }
  });
  const wsClient = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
      reconnect: true,
      lazy: true,
      connectionCallback: (error, result ) => {
        console.error(error);
        console.log(result);
      },
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
    auth.concat(http),
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
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }

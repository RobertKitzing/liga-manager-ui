import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { toIdValue } from 'apollo-utilities';

const uri = 'api/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });
  const auth = setContext((_, { headers }) => {
    if (!headers) {
      headers = new HttpHeaders();
    }
    // get the authentication token from local storage if it exists
    const token = 'test'; // localStorage.getItem('token');
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
  const cache = new InMemoryCache(
    {
      cacheRedirects: {
        Query: {
          season: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Season', id: args.id }))
        },
      }
    }
  );
  return {
    link: auth.concat(http),
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

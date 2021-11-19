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
import { getMainDefinition, getOperationName } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthenticationService,
    private appsettingsService: AppsettingsService,
    private graphqlSubscriptionService: GraphqlSubscriptionService,
    private notify: NotificationService,
    private translationService: TranslateService
  ) {
  }

  createApolloLink() {
    const http = this.httpLink.create({ uri: this.appsettingsService.appsettings.graphqlUrl });

    const afterwareLink = new ApolloLink((operation, forward) => {
      return forward(operation).map(response => {
        const { response: { headers } } = operation.getContext();
        if (headers) {
          const token = headers.get('x-token');
          if (token) {
            this.authService.accessToken = token;
          }
        }
        return response;
      });
    });

    const errorHandler = onError(({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}`,
          ),
        );
      }
      if (networkError) {
        switch (networkError['status']) {
          case 401:
            if (operation.operationName !== 'PasswordChange') {
              this.authService.logout();
            }
            break;
          default:
            this.notify.showErrorNotification(this.translationService.instant('UNKNOWN_NETWORK_ERROR'), networkError['statusText']);
        }
      }
    });

    const auth = setContext((_, { headers }) => {
      if (!headers) {
        headers = new HttpHeaders();
      }
      const authHeader = headers.get('Authorization');
      if (authHeader) {
        return {
          headers: headers
        };
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

    let link = errorHandler.concat(afterwareLink).concat(auth).concat(http);
    if (this.appsettingsService.appsettings.graphqlWsUrl) {

      this.graphqlSubscriptionService.subscriptionClient = new SubscriptionClient(
        this.appsettingsService.appsettings.graphqlWsUrl,
        {
          lazy: true,
          reconnect: true,
          reconnectionAttempts: 2
        });
      const wsClient = new WebSocketLink(this.graphqlSubscriptionService.subscriptionClient);

      link = split(
        // split based on operation type
        ({ query }) => {
          const { kind } = getMainDefinition(query);
          const operation = getOperationName(query);
          // const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsClient,
        link,
      );
    }
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

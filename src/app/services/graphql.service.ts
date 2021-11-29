import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Injectable } from '@angular/core';
import { AppsettingsService } from './appsettings.service';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';
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
    private notify: NotificationService,
    private translationService: TranslateService
  ) {
  }

  async init() {
    await this.appsettingsService.loadAppsettings();
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
    const cache = new InMemoryCache(
      {
        addTypename: true,
      }
    );
    this.apollo.create({
      link: link,
      cache: cache
    });

    if (this.authService.accessToken) {
      await this.authService.loadUser();
    }
    
  }

}

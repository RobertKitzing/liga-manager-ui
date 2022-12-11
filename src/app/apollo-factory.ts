import { HttpLink } from 'apollo-angular/http';
import { TranslateService } from "@ngx-translate/core";
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { onError } from '@apollo/client/link/error';

import { AppsettingsService } from "./services/appsettings.service";
import { AuthenticationService } from "./services/authentication.service";
import { NotificationService } from "./services/notification.service";

export function apolloFactory(httpLink: HttpLink, appsettingsService: AppsettingsService, translateService: TranslateService, notify: NotificationService, authenticationService: AuthenticationService) {
    const http = httpLink.create({ uri: appsettingsService.appsettings?.graphqlUrl });
    const token = authenticationService.accessToken;
    const middleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token || null}`)
        })
        return forward(operation)
    });
    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            const { response: { headers } } = operation.getContext();
            if (headers) {
                const token = headers.get('x-token');
                if (token) {
                    authenticationService.accessToken = token;
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
            switch (networkError.cause) {
                case 401:
                    if (operation.operationName !== 'PasswordChange') {
                        // authenticationService.logout();
                    }
                    break;
                default:
                    notify.showErrorNotification(translateService.instant('UNKNOWN_NETWORK_ERROR'), networkError.message);
            }
        }
    });
    const link = http //. middleware.concat(afterwareLink).concat(errorHandler).concat();
    return {
        cache: new InMemoryCache(),
        link
    }
}
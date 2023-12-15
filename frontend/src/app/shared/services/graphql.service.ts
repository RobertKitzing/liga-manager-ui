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
import { firstValueFrom } from 'rxjs';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceModeComponent } from '../dialogs';

@Injectable({
    providedIn: 'root',
})
export class GraphqlService {

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink,
        private authService: AuthenticationService,
        private appsettingsService: AppsettingsService,
        private notificationService: NotificationService,
        private dialog: MatDialog,
    ) {}

    async init() {
        await firstValueFrom(this.appsettingsService.loadAppsettings());
        const http = this.httpLink.create({
            uri: `${
                this.appsettingsService.appsettings?.host || ''
            }/api/graphql`,
        });

        const afterwareLink = new ApolloLink((operation, forward) => {
            return forward(operation).map((response) => {
                const {
                    response: { headers },
                } = operation.getContext();
                if (headers) {
                    const token = headers.get('x-token');
                    if (token) {
                        this.authService.accessToken = token;
                    }
                }
                return response;
            });
        });

        const errorHandler = onError(
            ({ graphQLErrors, networkError, operation }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const error: any = networkError;
                if (graphQLErrors) {
                    graphQLErrors.map(({ message }) =>
                        console.log(`[GraphQL error]: Message: ${message}`),
                    );
                }
                if (error) {
                    switch (error.status) {
                        case 401:
                            if (operation.operationName !== 'PasswordChange') {
                                this.authService.logout();
                            }
                            break;
                        case 400: {
                            const messages = error?.error?.errors?.map(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (x: any) => x.message,
                            );
                            this.notificationService.showErrorNotification(
                                marker('NETWORK_ERROR'),
                                messages,
                            );
                            break;
                        }
                        case 503: {
                            const open = this.dialog.getDialogById('maintenance-mode');
                            if (!open) {
                                this.dialog.open(MaintenanceModeComponent, { id: 'maintenance-mode'});
                            }
                            break;
                        }
                        default:
                            this.notificationService.showErrorNotification(
                                marker('UNKNOWN_NETWORK_ERROR'),
                                [error.message],
                            );
                    }
                }
            },
        );

        const auth = setContext((_, { headers }) => {
            if (!headers) {
                headers = new HttpHeaders();
            }
            const authHeader = headers.get('Authorization');
            if (authHeader) {
                return {
                    headers: headers,
                };
            }
            const token = this.authService.accessToken;
            if (token) {
                return {
                    headers: headers.get('Authorization')
                        ? null
                        : headers.append('Authorization', `Bearer ${token}`),
                };
            } else {
                return {};
            }
        });

        const link = errorHandler
            .concat(afterwareLink)
            .concat(auth)
            .concat(http);
        const cache = new InMemoryCache({
            addTypename: true,
        });
        this.apollo.create({
            link: link,
            cache: cache,
        });

        if (this.authService.accessToken) {
            try {
                await firstValueFrom(this.authService.loadUser());
            } catch (error) {
                // Empty Catch
            }

        }
    }

}

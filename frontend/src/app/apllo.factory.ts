import { inject } from "@angular/core";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { ApolloClientOptions, ApolloLink, HttpLink } from '@apollo/client/core';
import { AppsettingsService, AuthenticationService, LoginContext, NotificationService } from "./shared/services";
import { onError } from "@apollo/client/link/error";
import { marker } from "@colsen1991/ngx-translate-extract-marker";
import { MatDialog } from "@angular/material/dialog";
import { MaintenanceModeComponent } from "./shared/dialogs";
import { setContext } from "@apollo/client/link/context";
import { HttpHeaders } from "@angular/common/http";
import { Base64 } from "js-base64";

export function apolloFactory() {
    const appsettingsService = inject(AppsettingsService);
    const authenticationService = inject(AuthenticationService);
    const notificationService = inject(NotificationService);
    const dialog = inject(MatDialog);

    const uri = `${appsettingsService.appsettings?.host || ''}/api/graphql`
    const link = new HttpLink({ uri })

    const afterwareLink = new ApolloLink((operation, forward) => {
            return forward(operation).map((response) => {
                const {
                    response: { headers },
                } = operation.getContext();
                if (headers) {
                    const token = headers.get('x-token');
                    if (token) {
                        authenticationService.accessToken = token;
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
                            authenticationService.logout();
                        }
                        break;
                    case 400: {
                        const messages = error?.error?.errors?.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (x: any) => x.message,
                        );
                        notificationService.showErrorNotification(
                            marker('NETWORK_ERROR'),
                            messages,
                        );
                        break;
                    }
                    case 503: {
                        const open = dialog.getDialogById('maintenance-mode');
                        if (!open) {
                            dialog.open(MaintenanceModeComponent, { id: 'maintenance-mode'});
                        }
                        break;
                    }
                    default:
                        notificationService.showErrorNotification(
                            marker('UNKNOWN_NETWORK_ERROR'),
                            [error.message],
                        );
                }
            }
        },
    );

    const auth = setContext((_, { loginContext: lc }) => {
        let authHeader = '';

        if (lc) {
            const loginContext = lc as LoginContext;
            const base64 = Base64.encode(`${loginContext.username.toLowerCase()}:${loginContext.password}`);
            authHeader = `Basic ${base64}`;
        } else {
            const token = authenticationService.accessToken;
            authHeader = `Bearer ${token}`;
        }

        return {
            headers: { 'Authorization': authHeader },
        };
    });

    return {
        link: ApolloLink.from([ afterwareLink, errorHandler, auth, link ]),
        cache: new InMemoryCache(
            {
                addTypename: true,
            }
        ),
    } as ApolloClientOptions<NormalizedCacheObject>
}

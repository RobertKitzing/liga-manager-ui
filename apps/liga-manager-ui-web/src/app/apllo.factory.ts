import { inject } from '@angular/core';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import {
    ApolloClientOptions,
    ApolloLink,
    HttpLink,
    ServerError,
} from '@apollo/client/core';
import {
    AppsettingsService,
    AuthenticationService,
    LoginContext,
    NotificationService,
} from '@liga-manager-ui/services';
import { onError } from '@apollo/client/link/error';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { MatDialog } from '@angular/material/dialog';
import { setContext } from '@apollo/client/link/context';
import { Base64 } from 'js-base64';
import { MaintenanceModeComponent } from '@liga-manager-ui/components';

export function apolloFactory() {

    const appsettingsService = inject(AppsettingsService);
    const authenticationService = inject(AuthenticationService);
    const notificationService = inject(NotificationService);
    const dialog = inject(MatDialog);

    const uri = `${appsettingsService.appsettings?.host || ''}/api/graphql`;
    const link = new HttpLink({ uri });

    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map((response) => {
            const {
                response: { headers },
            } = operation.getContext();
            if (headers) {
                const token = headers.get('x-token') as string;
                if (token) {
                    authenticationService.accessToken.set(token);
                }
            }
            return response;
        });
    });

    const errorHandler = onError(
        ({ graphQLErrors, networkError, operation }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message }) =>
                    console.error(`[GraphQL error]: Message: ${message}`),
                );
            }
            if (networkError) {
                switch ((networkError as ServerError).statusCode) {
                    case 401:
                        if (operation.operationName !== 'PasswordChange') {
                            authenticationService.logout();
                        } else {
                            notificationService.showErrorNotification(marker('ERROR.OLD_PASSWORD_WRONG'));
                        }
                        break;
                    case 400:
                    case 409: {
                        const messages = graphQLErrors?.map((x) => x.message);
                        notificationService.showErrorNotification(
                            marker('ERROR.BAD_REQUEST'),
                            messages,
                        );
                        break;
                    }
                    case 503: {
                        const open = dialog.getDialogById('maintenance-mode');
                        if (!open) {
                            dialog.open(MaintenanceModeComponent, {
                                id: 'maintenance-mode',
                            });
                        }
                        break;
                    }
                    default:
                        notificationService.showErrorNotification(
                            marker('ERROR.UNKNOWN_NETWORK_ERROR'),
                            [],
                        );
                }
            }
        },
    );

    const auth = setContext((_, { loginContext: lc }) => {
        if (lc) {
            const loginContext = lc as LoginContext;
            const base64 = Base64.encode(
                `${loginContext.username.toLowerCase()}:${
                    loginContext.password
                }`,
            );
            return {
                headers: { Authorization: `Basic ${base64}` },
            };
        }
        const token = authenticationService.accessToken();
        if (token) {
            return {
                headers: { Authorization: `Bearer ${token}` },
            };
        }

        return {};
    });

    return {
        link: ApolloLink.from([afterwareLink, errorHandler, auth, link]),
        cache: new InMemoryCache({
            addTypename: true,
        }),
    } as ApolloClientOptions<NormalizedCacheObject>;
}

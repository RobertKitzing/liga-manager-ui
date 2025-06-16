import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GraphqlService, ThemeService, httpLoaderFactory } from './shared/services';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingIndicatorHttpInterceptor } from './shared/interceptors';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from '@apollo/client/core';
import { provideNgxWebstorage, withLocalStorage } from 'ngx-webstorage';

export const defaultDialogConfig = {
    // width: '50vw',
    // height: '50vh',
} as MatDialogConfig

function appInitFactory(
    graphqlService: GraphqlService,
    themeService: ThemeService,
) {
    return () => {
        return Promise.all([
            DarkMode.init({
                cssClass: 'dark',
                getter: () => themeService.darkMode,
                setter: (appearance) => { themeService.darkMode = appearance },
            }),
            // graphqlService.init(),
        ])
    };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNgxWebstorage(
        withLocalStorage(),
    ),
    provideApollo(
        () => {
            // const httpLink = inject(HttpLink);
            return {
                link: new HttpLink({ uri: '/api/graphql'}),
                cache: new InMemoryCache(),
            }
        },
    ),
    importProvidersFrom(
        MatNativeDateModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en-GB',
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ),
    provideAppInitializer(() => {
        const initializerFn = (appInitFactory)(inject(GraphqlService), inject(ThemeService));
        return initializerFn();
      }),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingIndicatorHttpInterceptor,
        multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};

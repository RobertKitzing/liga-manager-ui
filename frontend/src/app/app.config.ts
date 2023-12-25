import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ApolloModule } from 'apollo-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GraphqlService, ThemeService, httpLoaderFactory } from './shared/services';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingIndicatorHttpInterceptor } from './shared/interceptors';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';

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
            graphqlService.init(),
        ])
    };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
        MatNativeDateModule,
        ApolloModule,
        NgxWebstorageModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'en-GB',
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ),
    {
        provide: APP_INITIALIZER,
        useFactory: appInitFactory,
        deps: [
            GraphqlService,
            ThemeService,
        ],
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingIndicatorHttpInterceptor,
        multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};

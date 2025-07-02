import {
    ApplicationConfig,
    importProvidersFrom,
    inject,
    provideAppInitializer,
} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app.routes';
import {
    TranslateLoader,
    TranslateModule,
    TranslatePipe,
} from '@ngx-translate/core';
import {
    AppsettingsService,
    ThemeService,
    httpLoaderFactory,
} from './shared/services';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingIndicatorHttpInterceptor } from './shared/interceptors';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { provideApollo } from 'apollo-angular';
import { provideNgxWebstorage, withLocalStorage } from 'ngx-webstorage';
import { apolloFactory } from './apllo.factory';
import { DatePipe } from '@angular/common';

export const defaultDialogConfig = {
    // width: '50vw',
    // height: '50vh',
} as MatDialogConfig;

function appInitFactory(
    appsettingsService: AppsettingsService,
    themeService: ThemeService,
) {
    return () => {
        return Promise.all([
            DarkMode.init({
                cssClass: 'dark',
                getter: () => themeService.darkMode,
                setter: (appearance) => {
                    themeService.darkMode = appearance;
                },
            }),
            appsettingsService.loadAppsettings(),
        ]);
    };
}

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe,
        TranslatePipe,
        provideRouter(
            routes,
        ),
        provideNgxWebstorage(withLocalStorage()),
        provideApollo(apolloFactory),
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
            const initializerFn = appInitFactory(
                inject(AppsettingsService),
                inject(ThemeService),
            );
            return initializerFn();
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingIndicatorHttpInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
    ],
};

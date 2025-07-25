import {
    ApplicationConfig,
    importProvidersFrom,
    inject,
    provideAppInitializer,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import {
    TranslateLoader,
    TranslateModule,
    TranslatePipe,
    TranslateService,
} from '@ngx-translate/core';
import {
    AppsettingsService,
    I18nService,
    ThemeService,
    httpLoaderFactory,
    provideStorage,
} from '@liga-manager-ui/services';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingIndicatorHttpInterceptor } from './shared/interceptors';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { provideApollo } from 'apollo-angular';
import { apolloFactory } from './apllo.factory';
import { DatePipe, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { CustomDateAdapter } from './shared/utils';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '@liga-manager-api/openapi';
import { Base64 } from 'js-base64';

function appInitFactory(
    appsettingsService: AppsettingsService,
    themeService: ThemeService,
) {
    return () => {
        return Promise.all([
            DarkMode.init({
                cssClass: 'dark',
                getter: () => themeService.darkMode(),
                setter: (appearance) => {
                    themeService.darkMode.set(appearance);
                },
            }),
            firstValueFrom(appsettingsService.loadAppsettings()),
        ]);
    };
}

function openApiFactory(appsettingsService: AppsettingsService) {
    return new Configuration({
        basePath: appsettingsService.appsettings?.host || window.location.origin,
    });
}

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe,
        TranslatePipe,
        provideRouter(
            routes,
            withComponentInputBinding(),
        ),
        provideApollo(apolloFactory),
        importProvidersFrom(
            MatNativeDateModule,
            TranslateModule.forRoot({
                defaultLanguage: 'en-GB',
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpLoaderFactory,
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
        {
            provide: DateAdapter,
            useClass: CustomDateAdapter,
            deps: [I18nService, TranslateService],
        },
        provideStorage(localStorage),
        {
            provide: Configuration,
            useFactory: openApiFactory,
            deps: [ AppsettingsService ],
        },
        {
            provide: IMAGE_LOADER,
            useValue: (config: ImageLoaderConfig) => {
                const imgPath = `local:///${config.src}`;
                return `/imgproxy/_/rs:fit:${config.width}:${config.width}/${Base64.encode(imgPath)}`
            },
        },
    ],
};

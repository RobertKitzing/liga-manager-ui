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
import { provideApi } from '@liga-manager-api/openapi';
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
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        provideAnimationsAsync(),
        {
            provide: DateAdapter,
            useClass: CustomDateAdapter,
            deps: [I18nService, TranslateService],
        },
        provideStorage(localStorage),
        provideApi({}),
        {
            provide: IMAGE_LOADER,
            useFactory: (appsettingsService: AppsettingsService) =>
                (config: ImageLoaderConfig) => {
                    const host = appsettingsService.host;
                    const use_imgproxy = JSON.parse(appsettingsService.appsettings?.use_imgproxy || 'false');
                    const use_local_assets = JSON.parse(appsettingsService.appsettings?.use_local_assets || 'false');
                    const src = config.src.replace(/^\/+/g, '');
                    const isTeamLogo = src.startsWith('logos');
                    if (use_local_assets && !isTeamLogo) {
                        return `${window.location.protocol}//localhost/${src}`;
                    }
                    
                    if (!use_imgproxy) {
                        if (isTeamLogo) {
                            return `${host}/${src}`;
                        }
                        return `/${src}`;
                    }
                    return `${host}/imgproxy/_/rs:fit:${config.loaderParams!['width']}:${config.loaderParams!['height']}/${Base64.encode(`local:///${src}`)}`;
                },
            deps: [ AppsettingsService ],
        },
    ],
};

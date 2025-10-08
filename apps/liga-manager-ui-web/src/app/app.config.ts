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
    TranslateService,
} from '@ngx-translate/core';
import {
    I18nService,
    NotificationService,
    SeasonService,
    TeamService,
    TournamentService,
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
import { provideApi } from '@liga-manager-api/openapi';
import { Base64 } from 'js-base64';
import { NgxsNextPluginFn, provideStore, Store, withNgxsPlugin } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { environment } from '../env/env';
import { AppSettingsSelectors, AppSettingsState, AuthState, GetAuthenticatedUser, IConfirm, INotification, PitchState, SeasonState, SelectedItemsSelectors, SelectedItemsState, SetSelectedDarkMode, TeamState, TournamentState } from '@liga-manager-ui/states';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { firstValueFrom, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '@liga-manager-ui/components';

function appInitFactory(
    store: Store,
    teamService: TeamService,
    tournamentService: TournamentService,
    seasonService: SeasonService,
) {
    return () => {
        teamService.init();
        tournamentService.init();
        seasonService.init();
        return Promise.all([
            DarkMode.init({
                cssClass: 'dark',
                getter: () => store.selectSnapshot(SelectedItemsSelectors.selectedDarkMode),
                setter: (appearance) => {
                    store.dispatch(new SetSelectedDarkMode(appearance));
                },
            }),
            firstValueFrom(store.dispatch(GetAuthenticatedUser)),
        ]);
    };
}

function confirmPlugin(state: unknown, action: unknown, next: NgxsNextPluginFn) {

    const dialog = inject(MatDialog);

    const { confirm } = action as IConfirm;

    if( confirm ) {
        return dialog.open(ConfirmComponent, { data: { body: confirm.message, translateParams: confirm.translateParams }}).afterClosed().pipe(
            switchMap(
                (result) => {
                    if (result) {
                        return next(state, action);
                    }
                    return of();
                },
            ),
        );
    } else {
        return next(state, action);
    }
}

function notificationPlugin(state: unknown, action: unknown, next: NgxsNextPluginFn) {

    const notificationService = inject(NotificationService);

    return next(state, action).pipe(
        tap(
            () => {
                const { notification } = action as INotification;
                if (notification?.message) {
                    notificationService.showSuccessNotification('', [notification.message], notification.translateParams);
                }
            },
        ),
    );
}

export const appConfig: ApplicationConfig = {
    providers: [
        DatePipe,
        provideRouter(
            routes,
            withComponentInputBinding(),
        ),
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
                inject(Store),
                inject(TeamService),
                inject(TournamentService),
                inject(SeasonService),
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
        provideStore(
            [
                AuthState,
                AppSettingsState,
                SelectedItemsState,
                TournamentState,
                SeasonState,
                TeamState,
                PitchState,
            ],
            withNgxsReduxDevtoolsPlugin({
                disabled: environment.production,
            }),
            withNgxsStoragePlugin({
                keys: [
                    SelectedItemsState,
                    'auth.token',
                ],
            }),
            withNgxsFormPlugin(),
            withNgxsPlugin(confirmPlugin),
            withNgxsPlugin(notificationPlugin),
        ),
        provideApollo(apolloFactory),
        {
            provide: IMAGE_LOADER,
            useFactory: (store: Store) =>
                (config: ImageLoaderConfig) => {
                    const host = store.selectSnapshot(AppSettingsSelectors.host);
                    const use_imgproxy = store.selectSnapshot(AppSettingsSelectors.useImgproxy);
                    const use_local_assets = store.selectSnapshot(AppSettingsSelectors.useLocalAssets);
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
            deps: [ Store ],
        },
    ],
};

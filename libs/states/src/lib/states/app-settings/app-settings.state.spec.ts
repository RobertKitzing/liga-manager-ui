import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { AppSettingsState, AppSettingsStateModel } from './app-settings.state';
import { AppSettingsSelectors } from './app-settings.selectors';
import { LoadAppSettings } from './actions';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';


describe('AppSettingsState', () => {

    let store: Store;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStore(
                    [AppSettingsState],
                ),
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        store = TestBed.inject(Store);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should store Appsettings', () => {

        const appSettings: AppSettingsStateModel = {
            host: 'test',
            googleMapsApiKey: 'test',
            use_imgproxy: 'true',
            use_local_assets: 'true',
            local_time_zone: 'test',
        };

        jest.spyOn(httpClient, 'get').mockReturnValue(of(appSettings));
        store.dispatch(LoadAppSettings);

        const host = store.selectSnapshot(AppSettingsSelectors.host);
        expect(host).toBe(appSettings.host);

        const googleMapsApiKey = store.selectSnapshot(AppSettingsSelectors.googleMapsApiKey);
        expect(googleMapsApiKey).toBe(appSettings.googleMapsApiKey);

        const use_imgproxy = store.selectSnapshot(AppSettingsSelectors.useImgproxy);
        expect(use_imgproxy).toBe(true);

        const use_local_assets = store.selectSnapshot(AppSettingsSelectors.useLocalAssets);
        expect(use_local_assets).toBe(true);

        const local_time_zone = store.selectSnapshot(AppSettingsSelectors.localTimeZone);
        expect(local_time_zone).toBe(appSettings.local_time_zone);

    });

});

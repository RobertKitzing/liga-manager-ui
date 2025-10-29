import { createPropertySelectors, Selector } from '@ngxs/store';
import { AppSettingsState } from './app-settings.state';
import { AppSettings } from './app-settings';

export class AppSettingsSelectors {

    static properties = createPropertySelectors<AppSettings>(AppSettingsState);

    @Selector([AppSettingsSelectors.properties.languages])
    static showLanguages(languages?: AppSettings['languages']) {
        return languages?.split(',');
    }

    @Selector([AppSettingsSelectors.properties.host])
    static host(host?: AppSettings['host']) {
        return host || window.location.origin;
    }

    @Selector([AppSettingsSelectors.properties.googleMapsApiKey])
    static googleMapsApiKey(googleMapsApiKey: AppSettings['googleMapsApiKey']) {
        return googleMapsApiKey;
    }

    @Selector([AppSettingsSelectors.properties.use_imgproxy])
    static useImgproxy(use_imgproxy: AppSettings['use_imgproxy']) {
        return JSON.parse(use_imgproxy || 'false');
    }

    @Selector([AppSettingsSelectors.properties.use_local_assets])
    static useLocalAssets(use_local_assets: AppSettings['use_local_assets']) {
        return JSON.parse(use_local_assets || 'false');
    }

    @Selector([AppSettingsSelectors.properties.local_time_zone])
    static localTimeZone(local_time_zone: AppSettings['local_time_zone']) {
        return local_time_zone || 'Europe/Berlin';
    }

}

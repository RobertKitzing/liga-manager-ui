import { createPropertySelectors, Selector } from '@ngxs/store';
import { AppSettingsStateModel, AppSettingsState } from './app-settings.state';

export class AppSettingsSelectors {

    static properties = createPropertySelectors<AppSettingsStateModel>(AppSettingsState);

    @Selector([AppSettingsSelectors.properties.host])
    static host(host?: AppSettingsStateModel['host']) {
        return host || window.location.origin;
    }

    @Selector([AppSettingsSelectors.properties.googleMapsApiKey])
    static googleMapsApiKey(googleMapsApiKey: AppSettingsStateModel['googleMapsApiKey']) {
        return googleMapsApiKey;
    }

    @Selector([AppSettingsSelectors.properties.use_imgproxy])
    static useImgproxy(use_imgproxy: AppSettingsStateModel['use_imgproxy']) {
        return JSON.parse(use_imgproxy || 'false');
    }

    @Selector([AppSettingsSelectors.properties.use_local_assets])
    static useLocalAssets(use_local_assets: AppSettingsStateModel['use_local_assets']) {
        return JSON.parse(use_local_assets || 'false');
    }

    @Selector([AppSettingsSelectors.properties.local_time_zone])
    static localTimeZone(local_time_zone: AppSettingsStateModel['local_time_zone']) {
        return local_time_zone || 'Europe/Berlin';
    }

}

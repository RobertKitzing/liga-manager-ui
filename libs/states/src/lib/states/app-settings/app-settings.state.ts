import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LoadAppSettings } from './actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface AppSettingsStateModel {
    host?: string;
    googleMapsApiKey?: string;
    use_imgproxy?: string;
    use_local_assets?: string;
    local_time_zone?: string;
}

@State<AppSettingsStateModel>({
    name: 'app_settings',
    defaults: {},
})
@Injectable()
export class AppSettingsState {

    @Action(LoadAppSettings)
    loadAppsettings({ setState }: StateContext<AppSettingsStateModel>) {
        return inject(HttpClient).get<AppSettingsStateModel>('/appsettings.json').pipe(
            tap(
                (res) => {
                    setState(res);
                },
            ),
        );
    }

}
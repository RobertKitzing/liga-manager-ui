import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LoadAppSettings } from './actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AppSettings } from './app-settings';

@State<AppSettings>({
    name: 'app_settings',
    defaults: {},
})
@Injectable()
export class AppSettingsState {

    @Action(LoadAppSettings)
    loadAppsettings({ setState }: StateContext<AppSettings>) {
        return inject(HttpClient).get<AppSettings>('/appsettings.json').pipe(
            tap(
                (res) => {
                    setState(res);
                },
            ),
        );
    }

}
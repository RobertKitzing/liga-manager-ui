import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface AppsettingsModel {
    host: string;
    googleMapsApiKey: string;
    use_imgproxy: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppsettingsService {

    appsettings?: AppsettingsModel;

    get host() {
        return this.appsettings?.host || window.location.origin
    }

    private httpClient = inject(HttpClient);

    loadAppsettings() {
        return this.httpClient.get<AppsettingsModel>('/appsettings.json').pipe(
            tap((res) => {
                this.appsettings = res;
            }),
        );
    }

}

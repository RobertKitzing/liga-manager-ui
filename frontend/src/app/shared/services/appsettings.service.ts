import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AppsettingsModel, AppSettingsService } from 'src/api/openapi';

@Injectable({
    providedIn: 'root',
})
export class AppsettingsService {
    appsettings?: AppsettingsModel;

    constructor(private appSettingsService: AppSettingsService) {}

    loadAppsettings() {
        return this.appSettingsService.getAppsettings().pipe(
            tap((res) => {
                this.appsettings = res;
            })
        );
    }
}

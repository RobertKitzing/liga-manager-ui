import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, switchMap } from "rxjs";
import { AppsettingsService } from "./app/services/appsettings.service";

export class CustomTranslateHttpLoader implements TranslateLoader {

    constructor(
        private httpClient: HttpClient,
        private appsettingsService: AppsettingsService
    ) {

    }

    getTranslation(lang: string): Observable<any> {
        return this.appsettingsService.loadAppsettings().pipe(
            switchMap(
                () => this.httpClient.get(`${this.appsettingsService.appsettings?.host || ''}/weblate/language/${lang}`)
            )
        )
    }
}

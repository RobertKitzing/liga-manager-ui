import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";
import { TranslateService } from "@ngx-translate/core";
import { I18Service } from "src/app/services/i18.service";

@Injectable({
    providedIn: 'root'
})
export class CustomDateAdapter extends NativeDateAdapter {

    constructor(
        i18nService: I18Service,
        translateService: TranslateService,
    ) {
        super(i18nService.currentLang);

        translateService.onLangChange.subscribe(
            (lang) => {
                this.setLocale(lang);
            }
        );
        this.setLocale(translateService.currentLang);
    }

    getFirstDayOfWeek(): number {
        return 1;
    }

}
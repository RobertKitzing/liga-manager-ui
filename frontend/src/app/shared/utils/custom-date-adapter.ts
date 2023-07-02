import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@lima/shared/services';

@Injectable({
    providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {

    constructor(i18nService: I18nService, translateService: TranslateService) {
        super(i18nService.currentLang);

        translateService.onLangChange.subscribe((lang) => {
            this.setLocale(lang.lang);
        });
        this.setLocale(translateService.currentLang);
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }

}

import { inject, Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@liga-manager-ui/services';

@Injectable({
    providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {

    constructor() {
        super(inject(I18nService).currentLang);

        const translateService = inject(TranslateService);
        translateService.onLangChange.subscribe((lang) => {
            this.setLocale(lang.lang);
        });
        this.setLocale(translateService.currentLang);
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }

}

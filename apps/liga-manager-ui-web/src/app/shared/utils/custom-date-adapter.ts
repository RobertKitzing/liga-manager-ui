import { inject, Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@liga-manager-ui/services';
import { Locale, parse, toDate } from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {

    private dateFnsLocale?: Locale;

    constructor() {
        super(inject(I18nService).currentLang);

        const translateService = inject(TranslateService);
        translateService.onLangChange.subscribe((lang) => {
            this.setLocale(lang.lang);
        });
        this.setLocale(translateService.currentLang);
    }

    override setLocale(code: string): void {
        import(/* @vite-ignore */ `/assets/date-fns-locales/${code}.js`).then(
            (lang) => {
                this.dateFnsLocale = lang.default;
            },
        );
        super.setLocale(code);
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }

    override clone(date: Date): Date {
        return toDate(date);
    }

    override parse(value: unknown, _parseFormat?: unknown): Date | null {
        if (value) {
            if (typeof value === 'string') {
                return parse(value, 'P', new Date(), { locale: this.dateFnsLocale });
            }
            if (typeof value === 'number') {
                return toDate(value);
            }
            if (value instanceof Date) {
                return this.clone(value as Date);
            }
            return null;
        }
        return null;
    }

}

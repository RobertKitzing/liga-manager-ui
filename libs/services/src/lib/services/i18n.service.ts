import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, DOCUMENT, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fromStorage } from '../functions';
import { StorageKeys } from '@liga-manager-ui/common';
import { PruningTranslationLoader } from './pruning-translation-loader';

export interface StoredLang {
    code: string;
    direction?: string;
}

export function httpLoaderFactory() {
    return new PruningTranslationLoader('/i18n/', '.json');
}

@Injectable({
    providedIn: 'root',
})
export class I18nService {

    private translateService = inject(TranslateService);

    private document = inject(DOCUMENT);

    private httpClient = inject(HttpClient);

    storedLang = fromStorage<StoredLang>(StorageKeys.LANGUAGE);

    availableLang$ = this.httpClient.get<
        { code: string; direction: string; name: string; nativeName: string }[]
    >('/assets/languages.json');

    constructor(
    ) {
        this.translateService.setDefaultLang('en-GB');
        if (!this.storedLang()) {
            let code =
                this.translateService.getBrowserLang() ||
                this.translateService.defaultLang;
            if (code === 'en') {
                code = 'en-GB';
            }
            this.storedLang.set({ code });
        }
        this.changeLang(this.storedLang()!);
    }

    get currentLang(): string {
        return this.translateService.currentLang;
    }

    changeLang({ code, direction }: StoredLang) {
        this.setTextDir(direction);
        this.storedLang.set({ code, direction });
        import(/* @vite-ignore */ `/assets/locales/${code}.js`).then((lang) => {
            registerLocaleData(lang.default);
            this.translateService.use(code);
        });
    }

    setTextDir(direction?: string) {
        this.document.body.dir = direction || 'ltr';
    }

}

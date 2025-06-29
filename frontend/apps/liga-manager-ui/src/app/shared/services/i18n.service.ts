import { DOCUMENT, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const LANG_KEY = 'LANG';

export interface StoredLang {
    code: string;
    direction?: string;
}

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `/i18n/`, '.json');
}

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    @LocalStorage(LANG_KEY) storedLang?: StoredLang;

    availableLang$ = this.httpClient.get<
        { code: string; direction: string; name: string; nativeName: string }[]
    >('/assets/languages.json');

    constructor(
        private translateService: TranslateService,
        @Inject(DOCUMENT) private document: Document,
        private httpClient: HttpClient,
    ) {
        if (!this.storedLang) {
            let code =
                this.translateService.getBrowserLang() ||
                this.translateService.defaultLang;
            if (code === 'en') {
                code = 'en-GB';
            }
            this.storedLang = { code };
        }
        this.changeLang(this.storedLang);
    }

    get currentLang(): string {
        return this.translateService.currentLang;
    }

    changeLang({ code, direction }: { code: string; direction?: string }) {
        this.setTextDir(direction);
        this.storedLang = { code, direction };
        import(/* @vite-ignore */ `/assets/locales/${code}.js`).then((lang) => {
            registerLocaleData(lang.default);
            this.translateService.use(code);
        });
    }

    setTextDir(direction?: string) {
        this.document.body.dir = direction || 'ltr';
    }
}

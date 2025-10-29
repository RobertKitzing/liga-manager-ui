import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, DOCUMENT, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PruningTranslationLoader } from './pruning-translation-loader';
import { dispatch, select, Store } from '@ngxs/store';
import { AppSettingsSelectors, Language, SelectedItemsSelectors, SetSelectedLanguage } from '@liga-manager-ui/states';
import { map, switchMap } from 'rxjs';

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

    private store = inject(Store);

    private dispatchSelectedLanguage = dispatch(SetSelectedLanguage);

    storedLang = select(SelectedItemsSelectors.selectedLanguage);

    availableLang$ = this.store.select(AppSettingsSelectors.showLanguages).pipe(
        switchMap(
            (showLanguages) => {
                return this.httpClient.get<
                    { code: string; direction: string; name: string; nativeName: string }[]
                >('/assets/languages.json').pipe(
                    map(
                        (availableLanguages) => availableLanguages.filter((al) => showLanguages?.includes(al.code)),
                    ),
                );
            },
        ),
    );
    // availableLang$ = this.httpClient.get<
    //     { code: string; direction: string; name: string; nativeName: string }[]
    // >('/assets/languages.json').pipe(
    //     map(
    //         (availableLang) => {
    //             const showLanguages = this.store.selectSnapshot(AppSettingsSelectors.showLanguages);
    //             console.log(showLanguages);
    //             return availableLang.filter((al) => showLanguages?.includes(al.code));
    //         },
    //     ),
    // );

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
            this.dispatchSelectedLanguage({ code });
        }
        this.changeLang(this.storedLang()!);
    }

    get currentLang() {
        return this.translateService.currentLang;
    }

    changeLang({ code, direction }: Language) {
        this.setTextDir(direction);
        this.dispatchSelectedLanguage({ code, direction });
        import(/* @vite-ignore */ `/assets/locales/${code}.js`).then((lang) => {
            registerLocaleData(lang.default);
        });
        this.translateService.use(code);
    }

    setTextDir(direction?: string) {
        this.document.body.dir = direction || 'ltr';
    }

}

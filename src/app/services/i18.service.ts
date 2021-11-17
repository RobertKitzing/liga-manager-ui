import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import de from './i18n/de.json';
import deCustom from './i18n/custom/de.custom.json';
import en from './i18n/en.json';
import enCustom from './i18n/custom/en.custom.json';
import { LocalStorage } from 'ngx-webstorage';

const LANG_KEY = 'LANG';

@Injectable({
  providedIn: 'root'
})
export class I18Service {

  public availableLang: string[] = ['de', 'en'];

  @LocalStorage(LANG_KEY) storedLang: string;

  public get currentLang(): string {
    return this.translateService.currentLang;
  }

  constructor(private translateService: TranslateService) {
  }

  init() {
    this.translateService.setTranslation('de', de);
    this.translateService.setTranslation('de', deCustom, true);
    this.translateService.setTranslation('en', en);
    this.translateService.setTranslation('en', enCustom, true);
    if (!this.storedLang) {
      this.storedLang = this.translateService.getBrowserLang();
    }
    if (!this.storedLang) {
      this.storedLang = 'de';
    }
    this.changeLang(this.storedLang);
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    this.storedLang = lang;
  }
}

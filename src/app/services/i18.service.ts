import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as de from './i18n/de';
import * as en from './i18n/en';
import { LocalStorage } from 'ngx-store';

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
    this.translateService.setTranslation('en', en);
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

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as de from './i18n/de';
import * as en from './i18n/en';

@Injectable({
  providedIn: 'root'
})
export class I18Service {

  public availableLang: string[] = ['de', 'en'];

  public get currentLang(): string {
    return this.translateService.currentLang;
  }

  constructor(private translateService: TranslateService) {
  }

  init() {
    this.translateService.setTranslation('de', de);
    this.translateService.setTranslation('en', en);
    let defaultLang = localStorage.getItem('LANG');
    if (!defaultLang) {
      defaultLang = this.translateService.getBrowserLang();
    }
    if (!defaultLang) {
      defaultLang = 'de';
    }
    this.changeLang(defaultLang);
  }

  changeLang(lang: string) {
    localStorage.setItem('LANG', lang);
    this.translateService.use(lang);
  }
}

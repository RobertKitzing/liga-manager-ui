import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as de from './i18n/de';
import * as en from './i18n/en';

@Injectable({
  providedIn: 'root'
})
export class I18Service {

  constructor(private translateService: TranslateService) {
    // this.translateService.addLangs(['de', 'en']);
    this.translateService.setTranslation('de', de);
    this.translateService.setTranslation('en', en);
    this.translateService.use('en');
  }

  changeLang() {
  
    // if (this.translateService.currentLang === 'de' ) {
    //   this.translateService.use('en');
    // } else {
    //   this.translateService.use('de');
    // }
  }
}

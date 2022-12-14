import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { map } from 'rxjs';

const LANG_KEY = 'LANG';

@Injectable({
  providedIn: 'root'
})
export class I18Service {

  public availableLang$ = this.httpClient.get<any[]>('/weblate/projects/liga-manager/languages/').pipe(
    map(
      (res) => res.map(r => r.code)
    )
  );
  
  @LocalStorage(LANG_KEY) storedLang?: string;

  public get currentLang(): string {
    return this.translateService.currentLang;
  }

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
  ) {
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
    switch(lang) {
      case 'ar':
        this.setTextDir('rtl');
        break;
      default:
        this.setTextDir('ltr');
    }
  }

  setTextDir(dir: 'rtl' | 'ltr') {
    this.document.body.dir = dir;
  }

}

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

  public availableLang$ = this.httpClient.get<{ code: string, direction: string, name: string, nativeName: string }[]>('/weblate/languages');

  @LocalStorage(LANG_KEY) storedLang?: { code: string, direction?: string };

  public get currentLang(): string {
    return this.translateService.currentLang;
  }

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
  ) {
    if (!this.storedLang) {
      this.storedLang = { code: this.translateService.getBrowserLang()! };
    }
    if (!this.storedLang) {
      this.storedLang = { code: 'de' };
    }
    this.changeLang(this.storedLang);
  }

  changeLang(param: {code: string, direction?: string}) {
    this.translateService.use(param.code);
    this.setTextDir(param.direction);
  }

  setTextDir(direction?: string) {
    this.document.body.dir = direction || 'ltr';
  }

}

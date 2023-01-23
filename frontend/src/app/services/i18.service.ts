import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from 'ngx-webstorage';
import { map } from 'rxjs';
import { AppsettingsService } from './appsettings.service';

const LANG_KEY = 'LANG';

@Injectable({
  providedIn: 'root'
})
export class I18Service {

  private weblateUrl = `${this.appsettingsService.appsettings?.host || ''}/weblate/languages`;
  
  public availableLang$ = this.httpClient.get<{ code: string, direction: string, name: string, nativeName: string }[]>(this.weblateUrl);

  @LocalStorage(LANG_KEY) storedLang?: { code: string, direction?: string };

  public get currentLang(): string {
    return this.translateService.currentLang;
  }

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
    private appsettingsService: AppsettingsService,
  ) {
    if (!this.storedLang) {
      this.storedLang = { code: this.translateService.getBrowserLang()! };
    }
    this.changeLang(this.storedLang);
  }

  changeLang({code, direction}: {code: string, direction?: string}) {
    this.translateService.use(code);
    this.setTextDir(direction);
    this.storedLang = { code, direction}
  }

  setTextDir(direction?: string) {
    this.document.body.dir = direction || 'ltr';
  }

}

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes = ['default', 'gondi']
  currentTheme$ = new BehaviorSubject('default');

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentTheme$.subscribe(
      (theme) => {
        this.loadStyle(theme)
      }
    );
  }

  private loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${styleName}-theme.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}-theme.css`;

      head.appendChild(style);
    }
  }

  setDarkmode(dark: boolean) {
    const mode = dark ? 'add' : 'remove';
    this.document.body.classList[mode]('darkMode');
  }
}

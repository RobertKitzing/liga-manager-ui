import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DarkModeAppearance } from '@aparajita/capacitor-dark-mode';
import { BehaviorSubject } from 'rxjs';
import { fromStorage } from '../functions';
import { StorageKeys } from '@liga-manager-ui/common';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    darkMode = fromStorage<DarkModeAppearance>(StorageKeys.DARK_MODE_APPEARANCE);

    private currentTheme = fromStorage<string>(StorageKeys.THEME);

    themes = ['default', 'gondi', 'werder'];

    currentTheme$ = new BehaviorSubject(this.currentTheme() || 'default');

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.currentTheme$.subscribe((theme) => {
            this.loadStyle(theme);
        });
    }

    private loadStyle(styleName: string) {
        this.currentTheme.set(styleName);
        const head = this.document.getElementsByTagName('head')[0];

        const themeLink = this.document.getElementById(
            'client-theme',
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `${styleName}.css`;
        } else {
            const style = this.document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.href = `${styleName}.css`;

            head.appendChild(style);
        }
    }

}

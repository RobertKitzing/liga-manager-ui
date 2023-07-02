import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    @LocalStorage('THEME')
    private currentTheme?: string;

    @LocalStorage('DARK_MODE')
    private darkMode!: boolean;

    themes = ['default', 'gondi', 'werder'];

    currentTheme$ = new BehaviorSubject(this.currentTheme || 'default');

    darkMode$ = new BehaviorSubject<boolean>(
        window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches &&
            this.darkMode,
    );

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.currentTheme$.subscribe((theme) => {
            this.loadStyle(theme);
        });
        this.darkMode$.subscribe((dark) => {
            this.setDarkmode(dark);
        });
    }

    private loadStyle(styleName: string) {
        this.currentTheme = styleName;
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

    private setDarkmode(dark: boolean) {
        const mode = dark ? 'add' : 'remove';
        this.document.body.classList[mode]('dark');
        this.darkMode = dark;
    }

}

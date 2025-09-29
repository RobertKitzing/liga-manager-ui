import { Injectable, DOCUMENT, inject, DestroyRef } from '@angular/core';
import { SelectedItemsSelectors } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    themes = ['default', 'gondi', 'werder'];

    private document = inject(DOCUMENT);

    private store = inject(Store);

    private destroyRef = inject(DestroyRef);

    constructor() {
        this.store.select(SelectedItemsSelectors.selectedTheme).pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe((theme) => {
            this.loadStyle(theme);
        });
    }

    loadStyle(styleName: string) {
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

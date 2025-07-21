import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent, SnackBarData } from '../snackbar';
import { CySelectors } from '@liga-manager-ui/directives';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {

    defaultDuration = 6000;

    constructor(private snackBar: MatSnackBar) {}

    showSuccessNotification(title: string, messages?: string[], cySelector?: CySelectors) {
        this.showNotification(title, messages, 'success', cySelector, this.defaultDuration);
    }

    showErrorNotification(title: string, messages?: string[], cySelector?: CySelectors) {
        this.showNotification(
            title,
            messages,
            'error',
            cySelector,
            this.defaultDuration * 200,
        );
    }

    private showNotification(
        title: string,
        messages?: string[],
        type?: 'error' | 'success',
        cySelector?: CySelectors,
        duration?: number,
    ) {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                title,
                messages,
                type,
                cySelector,
            } as SnackBarData,
            duration: duration || this.defaultDuration,
            panelClass: [
                `mat-sys-${type}`,
                'border-2',
                'rounded',
            ],
        });
    }

}

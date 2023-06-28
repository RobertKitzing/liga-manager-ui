import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarData, SnackbarComponent } from '@lima/shared/components';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    defaultDuration = 6000;

    constructor(private snackBar: MatSnackBar) {}

    showSuccessNotification(title: string, messages?: string[]) {
        this.showNotification(title, messages, 'success');
    }

    showErrorNotification(title: string, messages?: string[]) {
        this.showNotification(
            title,
            messages,
            'warn',
            this.defaultDuration * 2,
        );
    }

    private showNotification(
        title: string,
        messages?: string[],
        type?: 'warn' | 'success',
        duration?: number,
    ) {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                title,
                messages,
                type,
            } as SnackBarData,
            duration: duration || this.defaultDuration,
            panelClass: [
                `bg-${type}-100`,
                `text-${type}-c100`,
                `border-2`,
                `dark:border-toolbardark`,
                `rounded`,
            ],
        });
    }
}

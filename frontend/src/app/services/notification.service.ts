import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  defaultDuration = 6000;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSuccessNotification(title: string, message?: string) {
    this.showNotification(title, message, 'success');
  }

  showErrorNotification(title: string, message?: any) {
    this.showNotification(title, message, 'warn');
  }

  private showNotification(title: string, message?: string, type?: 'warn' | 'success', duration?: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title,
        message,
        type
      },
      duration: duration || this.defaultDuration,
      panelClass: [`bg-${type}`, `text-${type}-cdefault`, `border-2`, `dark:border-toolbardark`, `rounded`]
    });
  }
}

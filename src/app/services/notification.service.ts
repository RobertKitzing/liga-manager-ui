import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/shared/snackbar/snackbar.component';

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

  showErrorNotification(title: string, message?: string) {
    this.showNotification(title, message, 'danger');
  }

  private showNotification(title: string, message: string, type: 'danger' | 'success', duration?: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: title,
        message: message
      },
      duration: duration || this.defaultDuration,
      panelClass: ['alert', `alert-${type}`]
    });
  }
}

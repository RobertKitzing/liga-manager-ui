import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  newPassword: FormControl;
  oldPassword: FormControl;
  oldPasswordWrong: boolean;

  constructor(
      private authService: AuthenticationService,
      private notify: NotificationService,
      private translateService: TranslateService,
      public dialogRef: MatDialogRef<ChangepasswordComponent>) { }

  ngOnInit() {
      this.newPassword = new FormControl('', [
          Validators.required,
          Validators.minLength(6)
      ]);
      this.oldPassword = new FormControl('', [
          Validators.required
      ]);
  }

  async changePassword() {
      try {
        await this.authService.changePassword(this.newPassword.value, this.oldPassword.value);
        this.oldPasswordWrong = false;
        this.authService.logout();
        this.notify.showSuccessNotification(this.translateService.instant('PASSWORD_CHANGED_SUCCESS'));
        this.dialogRef.close();
      } catch (error) {
          this.notify.showErrorNotification(this.translateService.instant('PASSWORD_CHANGED_ERROR'), error);
          this.oldPasswordWrong = true;
      }
  }
}

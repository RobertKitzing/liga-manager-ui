import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService, LoginContext } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lima-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  error?: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private translateService: TranslateService,
    private notify: NotificationService
  ) {
  }

  ngOnInit() {
  }

  async login() {
    try {
      this.error = false;
      await firstValueFrom(this.authenticationService.login(this.loginForm.value as LoginContext));
      this.dialogRef.close();
    } catch (error) {
      this.error = true;
      this.loginForm.controls.password.setValue('');
      this.loginForm.controls.username.setErrors({ required: true });
      this.loginForm.controls.password.setErrors({ required: true });
    }
  }

  async passwordForgot(email: string) {
    if (email) {
      try {
        await this.authenticationService.sendPasswordMail(email);
        this.notify.showSuccessNotification(this.translateService.instant('SEND_NEW_PASSWORD_MAIL_SUCCESS'));
      } catch (error) {
        this.notify.showErrorNotification(this.translateService.instant('SEND_NEW_PASSWORD_MAIL_ERROR'), error);
      }
    } else {
      this.loginForm.controls.username.setErrors({ required: true });
      this.loginForm.controls.password.disable();
    }
  }
}

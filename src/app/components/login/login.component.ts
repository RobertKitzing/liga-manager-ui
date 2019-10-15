import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private translateService: TranslateService,
    private notify: NotificationService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    try {
      this.error = false;
      await this.authenticationService.loginAsync(this.loginForm.value);
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

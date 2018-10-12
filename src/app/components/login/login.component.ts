import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Client, SendPasswordResetMailBody } from '../../../api';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  error: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private apiClient: Client,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
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
    this.isLoading = true;
    if (await this.authenticationService.loginAsync(this.loginForm.value)) {
      this.loginForm.markAsPristine();
      this.isLoading = false;
      this.dialogRef.close();
    } else {
      this.isLoading = false;
      this.error = true;
    }
  }

  passwordForgot(email: string) {
    if (email) {
      const body = new SendPasswordResetMailBody();
      body.email = email;
      body.target_path = 'newpassword';
      this.apiClient.sendPasswordResetMail(body).subscribe(
        () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('SEND_NEW_PASSWORD_MAIL_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        },
        () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('SEND_NEW_PASSWORD_MAIL_ERROR')
            },
            panelClass: ['alert', 'alert-danger']
          });
        }
      );
    } else {
      this.loginForm.controls['username'].setErrors({required: true});
    }
  }
}

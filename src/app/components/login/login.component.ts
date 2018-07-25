import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material';
import { Client, SendPasswordResetMailBody } from '../../../api';

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
    private apiClient: Client
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
          alert('Email ist unterwegs');
        }
      );
    } else {
      this.loginForm.controls['username'].setErrors({required: true});
    }
  }
}

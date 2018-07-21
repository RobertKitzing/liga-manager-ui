import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material';

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
}

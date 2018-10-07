import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Client, ChangePasswordBody } from 'src/api';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  loginForm: FormGroup;
  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    private apiClient: Client
  ) {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      async (params) => {
        if (params['token']) {
          this.authService.setAccessToken({ token: params['token'] });
          const user = await this.authService.loadUser();
          if (user) {
            this.token = params['token'];
          } else {
            this.authService.setAccessToken({ token: null });
          }
        }
      }
    );
  }

  submit() {
    const body = new ChangePasswordBody();
    body.new_password = this.loginForm.value.password;
    this.apiClient.changePassword(body).subscribe(
      () => {
        alert('Passwort geändert, bitte neu einloggen');
        this.authService.logout();
      }
    );
  }
}

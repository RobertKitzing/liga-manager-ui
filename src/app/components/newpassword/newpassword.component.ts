import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  loginForm: FormGroup;
  token: string;

  constructor(
    public authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      async (params) => {
        if (params['token']) {
          this.authService.accessToken = params['token'];
          const user = await this.authService.loadUser();
          if (user) {
            this.token = params['token'];
          } else {
            this.authService.accessToken = null;
          }
        }
      }
    );
  }

  async submit() {
    try {
      await this.authService.changePassword(this.loginForm.value.password);
      this.authService.logout();
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('PASSWORD_CHANGED_SUCCESS')
          },
          panelClass: ['alert', 'alert-success'],
          duration: 30000
        });
    } catch (error) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('PASSWORD_CHANGED_ERROR')
        },
        panelClass: ['alert', 'alert-danger'],
        duration: 30000
      });
    }
  }
}

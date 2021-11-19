import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  loginForm =  new FormGroup({
    password: new FormControl(null, [ Validators.required, Validators.minLength(6)])
  });

  token: string;

  constructor(
    public authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private notify: NotificationService
  ) {
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
            this.authService.logout();
          }
        }
      }
    );
  }

  async submit() {
    try {
      await this.authService.setPassword(this.loginForm.value.password);
      this.authService.logout();
      this.notify.showSuccessNotification(this.translateService.instant('PASSWORD_CHANGED_SUCCESS'));
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('PASSWORD_CHANGED_ERROR'), error);
    }
  }
}

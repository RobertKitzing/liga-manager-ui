import { Component, OnInit } from '@angular/core';
import { UserRole, CreateUserGQL } from 'src/api/graphql';
import { FormControl, Validators } from '@angular/forms';
import { TeamService } from '../../../../services/team.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSelectChange } from '@angular/material';
import { AuthenticationService } from '../../../../services/authentication.service';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userTeamList: string[] = new Array<string>();

  userRole: UserRole;

  UserRole = UserRole;

  email: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;

  constructor(
    public teamService: TeamService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private createUserGQL: CreateUserGQL
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  ngOnInit() {
  }
  onChangeTeamSelect(event: MatSelectChange) {
    this.userTeamList = event.value;
  }

  async createUser() {
    try {
      await this.createUserGQL.mutate(
        {
          id: uuid(),
          email: this.email.value.toLowerCase(),
          password: this.password.value,
          first_name: this.firstName.value,
          last_name: this.lastName.value,
          team_ids: this.userTeamList,
          role: this.userRole
        }
      ).toPromise();
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('CREATE_USER_SUCCESS')
        },
        panelClass: ['alert', 'alert-success']
      });
    } catch (error) {
      console.error(error);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('CREATE_USER_ERROR')
        },
        panelClass: ['alert', 'alert-danger']
      });
    }
  }

  async sendUsermail() {
    try {
      await this.authService.sendPasswordMail(this.email.value.toLowerCase());
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('SEND_NEW_PASSWORD_MAIL_SUCCESS')
        },
        panelClass: ['alert', 'alert-success']
      });
    } catch (error) {
      console.error(error);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('SEND_NEW_PASSWORD_MAIL_ERROR')
        },
        panelClass: ['alert', 'alert-danger']
      });
    }
  }
}

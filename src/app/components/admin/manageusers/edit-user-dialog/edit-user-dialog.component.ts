import { Component, OnInit, Inject } from '@angular/core';
import { UserRole, CreateUserGQL, AllUsersGQL, User, UpdateUserGQL } from 'src/api/graphql';
import { FormControl, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatSelectChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

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
    private authService: AuthenticationService,
    private createUserGQL: CreateUserGQL,
    private usersGQL: AllUsersGQL,
    private notify: NotificationService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private updateUserGQL: UpdateUserGQL,
    @Inject(MAT_DIALOG_DATA) public user: User.Fragment,
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    if (!this.user) {
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]);
    }
    if (this.user) {
      this.email.setValue(this.user.email);
      this.firstName.setValue(this.user.first_name);
      this.lastName.setValue(this.user.last_name);
      this.userRole = this.user.role;
      this.userTeamList = this.user.teams.map(t => t.id);
    }
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
        }, {
          refetchQueries: [
            {
              query: this.usersGQL.document
            }
          ]
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_USER_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_USER_ERROR'), error);
    }
  }

  async updateUser() {
    try {
      await this.updateUserGQL.mutate(
        {
          user_id: this.user.id,
          email: this.email.value.toLowerCase(),
          first_name: this.firstName.value,
          last_name: this.lastName.value,
          team_ids: this.userTeamList,
          role: this.userRole
        }, {
          refetchQueries: [
            {
              query: this.usersGQL.document
            }
          ]
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('UPDATE_USER_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('UPDATE_USER_ERROR'), error);
    }
  }

  async sendUsermail() {
    try {
      await this.authService.sendPasswordMail(this.email.value.toLowerCase());
      this.notify.showSuccessNotification(this.translateService.instant('SEND_NEW_PASSWORD_MAIL_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('SEND_NEW_PASSWORD_MAIL_ERROR'), error);
    }
  }
}

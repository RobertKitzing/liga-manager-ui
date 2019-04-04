import { Component, OnInit } from '@angular/core';
import { AllUsersGQL, User, DeleteUserGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: Observable<User.Fragment[]>;

  constructor(
    private allUsersGQL: AllUsersGQL,
    private deleteUserGQL: DeleteUserGQL,
    private notify: NotificationService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.allUsers = this.allUsersGQL.watch().valueChanges.pipe(
      map(({ data }) => data.allUsers.sort((a, b) => a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1))
    );
  }

  createNewUser() {
    this.dialog.open(EditUserDialogComponent);
  }

  editUser(user: User.Fragment) {

    this.dialog.open(EditUserDialogComponent, {
      data: user
    });
  }

  deleteUser(user: User.Fragment) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE', { thing: user.email })
      }
    });

    dialogRef.afterClosed().subscribe(
      async (confirm) => {
        if (confirm) {
          try {
            await this.deleteUserGQL.mutate({
              user_id: user.id
            }, {
                refetchQueries: [
                  {
                    query: this.allUsersGQL.document
                  }
                ]
              }).toPromise();
            this.notify.showSuccessNotification(this.translateService.instant('DELETE_USER_SUCCESS', { user: user.email }));
          } catch (error) {
            this.notify.showErrorNotification(this.translateService.instant('DELETE_USER_ERROR'), error);
          }
        }
      }
    );
  }
}

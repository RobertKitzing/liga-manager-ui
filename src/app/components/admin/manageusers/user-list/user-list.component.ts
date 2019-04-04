import { Component, OnInit } from '@angular/core';
import { AllUsersGQL, User } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: Observable<User.Fragment[]>;

  constructor(
    private allUsersGQL: AllUsersGQL,
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

  }
}

import { Component, OnInit } from '@angular/core';
import { AllUsersGQL, User } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: Observable<User.Fragment[]>;

  constructor(
    private allUsersGQL: AllUsersGQL
  ) { }

  ngOnInit() {
    this.allUsers = this.allUsersGQL.watch().valueChanges.pipe(
      map(({ data }) => data.allUsers.sort((a, b) => a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1))
    );
  }

}

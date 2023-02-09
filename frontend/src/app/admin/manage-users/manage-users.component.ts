import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'lima-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {

  displayedColumns: string[] = ['email', 'team', 'action'];

  searchUser = new FormControl();

  users$ = this.searchUser.valueChanges.pipe(
    startWith(null),
    switchMap(
      (searchTerm) => !searchTerm ? this.userService.allUsers$ : this.userService.allUsers$.pipe(map((x) => x.filter((y) => y?.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) )))
    )
  );

  constructor(
    private userService: UserService,
  ) {

  }
}

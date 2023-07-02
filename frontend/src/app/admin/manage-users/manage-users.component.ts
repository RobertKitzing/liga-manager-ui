import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { User } from 'src/api/graphql';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { UserService } from '@lima/shared/services';

@Component({
    selector: 'lima-manage-users',
    templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent {
    displayedColumns: string[] = ['email', 'action'];

    searchUser = new FormControl();

    users$ = this.searchUser.valueChanges.pipe(
        startWith(null),
        switchMap((searchTerm) =>
            !searchTerm
                ? this.userService.allUsers$
                : this.userService.allUsers$.pipe(
                      map((x) =>
                          x?.filter(
                              (y) =>
                                  y?.email
                                      .toLocaleLowerCase()
                                      .includes(
                                          searchTerm.toLocaleLowerCase(),
                                      ) ||
                                  y?.first_name
                                      .toLocaleLowerCase()
                                      .includes(
                                          searchTerm.toLocaleLowerCase(),
                                      ) ||
                                  y?.last_name
                                      .toLocaleLowerCase()
                                      .includes(searchTerm.toLocaleLowerCase()),
                          ),
                      ),
                  ),
        ),
    );

    constructor(private userService: UserService, private dialog: MatDialog) {}

    editUser(user?: User) {
        this.dialog.open(EditUserDialogComponent, {
            width: '100%',
            data: user,
        });
    }

    createUser() {
        this.editUser();
    }

    async sendPasswordMail(email: string) {
        await firstValueFrom(this.userService.sendPasswordMail(email));
    }
}

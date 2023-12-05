import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { User } from 'src/api/graphql';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { UserService } from '@lima/shared/services';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'lima-manage-users',
    templateUrl: './manage-users.component.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
        TranslateModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        AsyncPipe,
    ],
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

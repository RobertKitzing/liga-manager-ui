import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { User } from '@liga-manager-api/graphql';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NotificationService, UserService } from '@liga-manager-ui/services';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmComponent, defaultDialogConfig } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatCardModule } from '@angular/material/card';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        CypressSelectorDirective,
        MatCardModule,
    ],
})
export class ManageUsersComponent {

    private userService = inject(UserService);

    private dialog = inject(MatDialog);

    private notificationService = inject(NotificationService);

    private translateService = inject(TranslateService);

    private destroyRef = inject(DestroyRef);

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

    editUser(user?: User) {
        this.dialog.open(EditUserDialogComponent, {
            ...defaultDialogConfig,
            data: user,
        });
    }

    deleteUser(user?: User) {
        this.dialog.open(ConfirmComponent,
            {
                ...defaultDialogConfig,
                data: {
                    body: this.translateService.instant('CONFIRM.ARE_YOU_SURE_TO_DELETE_USER', { user: user?.email }),
                },
            },
        )
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                async (result) => {
                    if (result) {
                        try {
                            await firstValueFrom(this.userService.deleteUser({ user_id: user?.id || '' }));
                            this.notificationService.showSuccessNotification(
                                this.translateService.instant('SUCCESS.DELETE_USER'),
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    }
                },
            );
    }

    createUser() {
        this.editUser();
    }

    async sendInviteMail(user_id: string) {
        await firstValueFrom(this.userService.sendInviteMail(user_id));
        this.notificationService.showSuccessNotification(marker('SUCCESS.SEND_MAIL'));
    }

    sendPasswordMail(user_id: string) {
        firstValueFrom(this.userService.sendPasswordMail(user_id));
        this.notificationService.showSuccessNotification(marker('SUCCESS.SEND_MAIL'));
    }

}

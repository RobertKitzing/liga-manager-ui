/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, inject, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogClose,
    MatDialogModule,
} from '@angular/material/dialog';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';
import { User, UserRole } from '@liga-manager-api/graphql';
import { v4 as uuidv4 } from 'uuid';
import { generator } from 'ts-password-generator';
import { TeamService, UserService } from '@liga-manager-ui/services';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { CypressSelectorDirective, TrimDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatDialogClose,
        MatIconModule,
        AsyncPipe,
        KeyValuePipe,
        CypressSelectorDirective,
        TrimDirective,
        MatDialogModule,
    ],
})
export class EditUserDialogComponent implements OnInit {

    user = inject<User>(MAT_DIALOG_DATA);

    private teamService = inject(TeamService);

    private userService = inject(UserService);

    private dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

    UserRole = UserRole;

    searchTeam = new FormControl();

    allTeams$ = this.searchTeam.valueChanges.pipe(
        startWith(null),
        switchMap((searchTerm) =>
            !searchTerm
                ? this.teamService.allTeams$
                : this.teamService.allTeams$.pipe(
                    map((t) =>
                        t?.filter((x) =>
                            x?.name
                                .toLocaleLowerCase()
                                .includes(searchTerm.toLocaleLowerCase()),
                        ),
                    ),
                ),
        ),
    );

    userFormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        role: new FormControl<UserRole>(UserRole.TeamManager, {
            nonNullable: true,
        }),
        team_ids: new FormControl<string[]>([]),
    });

    ngOnInit(): void {
        if (this.user) {
            this.userFormGroup.patchValue({
                ...this.user,
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                team_ids: this.user.teams?.map((t) => t?.id!)!,
            });
        }
    }

    async onSaveClicked() {
        if (this.user) {
            await firstValueFrom(
                this.userService.updateUser({
                    user_id: this.user.id,
                    ...this.userFormGroup.value,
                }),
            );
            this.dialogRef.close();
        } else {
            await firstValueFrom(
                this.userService.createUser({
                    user_id: uuidv4(),
                    email: this.userFormGroup.value.email!.trim(),
                    first_name: this.userFormGroup.value.first_name!.trim(),
                    last_name: this.userFormGroup.value.last_name!.trim(),
                    role: this.userFormGroup.value.role!,
                    team_ids: this.userFormGroup.value.team_ids!,
                    password: generator({
                        haveNumbers: true,
                        haveSymbols: true,
                    }),
                }),
            );
            this.userService.sendPasswordMail({email: this.userFormGroup.value.email!, target_path: APP_ROUTES.NEW_PASSWORD});
            this.dialogRef.close();
        }
    }

}

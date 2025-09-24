
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService, NotificationService, UserService } from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatInput,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
})
export class ChangePasswordComponent {

    private userService = inject(UserService);

    private authService = inject(AuthenticationService);

    private notificationService = inject(NotificationService);

    private translateService = inject(TranslateService);

    data = inject<{ body: string }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<ChangePasswordComponent>);

    passwordForm = new FormGroup({
        new: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
        old: new FormControl('', [ Validators.required ]),
    });

    async changePassword() {
        try {
            await firstValueFrom(this.userService.changePassword(this.passwordForm.value.new || '', this.passwordForm.value.old || ''));
            this.authService.logout();
            this.notificationService.showSuccessNotification(this.translateService.instant('PASSWORD_CHANGED_SUCCESS'));
            this.dialogRef.close();
        } catch (error) {
            console.error(error);
        }
    }

}

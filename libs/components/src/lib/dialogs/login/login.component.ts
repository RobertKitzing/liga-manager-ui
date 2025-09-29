import { Component, inject } from '@angular/core';
import {
    Validators,
    FormGroup,
    FormControl,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import {
    NotificationService,
    UserService,
} from '@liga-manager-ui/services';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { MatCardModule } from '@angular/material/card';
import { dispatch } from '@ngxs/store';
import { Login } from '@liga-manager-ui/states';

@Component({
    selector: 'lima-login',
    templateUrl: './login.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        MatDialogTitle,
        TranslateModule,
        MatDialogContent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        CypressSelectorDirective,
        MatCardModule,
        MatDialogModule,
    ],
})
export class LoginComponent {

    private userService = inject(UserService);

    private dispatchLogin = dispatch(Login);

    dialogRef = inject(MatDialogRef<LoginComponent>);

    private notificationService = inject(NotificationService);

    loginForm = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    async login() {
        try {
            await firstValueFrom(this.dispatchLogin(this.loginForm.value));
            this.dialogRef.close();
        } catch (_error) {
            console.error(_error);
            this.loginForm.controls.password.setValue('');
            this.loginForm.controls.username.setErrors({ required: true });
            this.loginForm.controls.password.setErrors({ required: true });
        }
    }

    async passwordForgot(email: string) {
        if (email) {
            try {
                await this.userService.sendPasswordMail({email, target_path: APP_ROUTES.NEW_PASSWORD_ROUTE});
                this.notificationService.showSuccessNotification(
                    marker('SEND_NEW_PASSWORD_MAIL_SUCCESS'),
                );
                this.dialogRef.close();
            } catch (_error) {
                console.error(_error);
            }
        } else {
            this.loginForm.controls.username.setErrors({ required: true });
            this.loginForm.controls.password.disable();
        }
    }

}

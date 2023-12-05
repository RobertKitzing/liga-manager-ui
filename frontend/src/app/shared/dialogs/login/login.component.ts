import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import {
    AuthenticationService,
    LoginContext,
    NotificationService,
} from '@lima/shared/services';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

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
    ],
})
export class LoginComponent {

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

    constructor(
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<LoginComponent>,
        private notify: NotificationService,
    ) {}

    async login() {
        try {
            await firstValueFrom(
                this.authenticationService.login(
                    this.loginForm.value as LoginContext,
                ),
            );
            this.dialogRef.close();
        } catch (error) {
            this.loginForm.controls.password.setValue('');
            this.loginForm.controls.username.setErrors({ required: true });
            this.loginForm.controls.password.setErrors({ required: true });
        }
    }

    async passwordForgot(email: string) {
        if (email) {
            try {
                await this.authenticationService.sendPasswordMail(email);
                this.notify.showSuccessNotification(
                    marker('SEND_NEW_PASSWORD_MAIL_SUCCESS'),
                );
                this.dialogRef.close();
            } catch (error) {
                // throw error;
            }
        } else {
            this.loginForm.controls.username.setErrors({ required: true });
            this.loginForm.controls.password.disable();
        }
    }

}

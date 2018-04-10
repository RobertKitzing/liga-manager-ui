import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Client, ChangePasswordBody } from '@app/api/openapi';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '@app/core';

@Component({
    selector: 'app-change-password',
    templateUrl: 'changepassword.component.html'
})
export class ChangePasswordComponent implements OnInit {

    password: FormControl;
    oldPasswordFc: FormControl;
    oldPasswordError: boolean;
    newPasswordError: boolean;

    newPassword: string;
    oldPassword: string;

    constructor(private api: Client,
                private authService: AuthenticationService,
                public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

    ngOnInit() {
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
        this.oldPasswordFc = new FormControl('', [
            Validators.required
        ]);
    }

    async changePassword() {

        if (await this.authService.checkPassword(this.oldPassword)) {
            this.oldPasswordError = false;
            const body = new ChangePasswordBody();
            body.new_password = this.newPassword;
            this.api.changePassword(body).subscribe(
                () => {
                    this.dialogRef.close(true);
                },
                (error) => {
                    this.newPasswordError = true;
                }
            );
        } else {
            this.oldPasswordError = true;
        }
    }
}

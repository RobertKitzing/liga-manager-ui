import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '@app/service/authentication.service';

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

    constructor(
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
        if (await this.authService.changePassword(this.oldPassword, this.newPassword)) {
            this.oldPasswordError = false;
            this.authService.logout();
            this.dialogRef.close();
        } else {
            this.oldPasswordError = true;
        }
    }
}
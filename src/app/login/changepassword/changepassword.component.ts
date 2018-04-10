import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Client, ChangePasswordBody } from '@app/api/openapi';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-change-password',
    templateUrl: 'changepassword.component.html'
})
export class ChangePasswordComponent implements OnInit {

    password: FormControl;

    newPassword: string;

    constructor(private api: Client,
                public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

    ngOnInit() {
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
    }

    changePassword() {
        const body = new ChangePasswordBody();
        body.new_password = this.newPassword;
        this.api.changePassword(body).subscribe(
            () => {
                this.dialogRef.close(true);
            },
            (error) => {
                this.dialogRef.close(false);
            }
        );
    }
}

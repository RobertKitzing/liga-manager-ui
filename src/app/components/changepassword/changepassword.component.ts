import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  newPassword: FormControl;
  oldPassword: FormControl;
  oldPasswordWrong: boolean;

  constructor(
      private authService: AuthenticationService,
      public dialogRef: MatDialogRef<ChangepasswordComponent>) { }

  ngOnInit() {
      this.newPassword = new FormControl('', [
          Validators.required,
          Validators.minLength(6)
      ]);
      this.oldPassword = new FormControl('', [
          Validators.required
      ]);
  }

  async changePassword() {
      try {
        await this.authService.changePassword(this.newPassword.value, this.oldPassword.value);
        this.oldPasswordWrong = false;
        this.authService.logout();
        this.dialogRef.close();
      } catch (error) {
          console.error(error);
          this.oldPasswordWrong = true;
      }
  }
}

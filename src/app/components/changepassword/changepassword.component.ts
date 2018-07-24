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

  password: FormControl;
  oldPasswordFc: FormControl;
  oldPasswordError: boolean;
  newPasswordError: boolean;

  newPassword: string;
  oldPassword: string;

  constructor(
      private authService: AuthenticationService,
      public dialogRef: MatDialogRef<ChangepasswordComponent>) { }

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

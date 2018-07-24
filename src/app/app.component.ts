import { Component, OnInit } from '@angular/core';
import { SeasonService } from './services/season.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public seasonService: SeasonService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {
  }

  async ngOnInit() {
    if (this.authService.accessToken) {
      await this.authService.loadUser();
    }
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangepasswordComponent);
  }
}

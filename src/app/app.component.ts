import { Component, OnInit } from '@angular/core';
import { SeasonService } from './services/season.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { I18Service } from './services/i18.service';

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

  ngOnInit() {
    this.authService.load();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }
}

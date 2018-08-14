import { Component, OnInit, HostListener } from '@angular/core';
import { SeasonService } from './services/season.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { environment } from 'src/environments/environment';
import { I18Service } from './services/i18.service';
import { WebsocketService } from './services/websocket.service';
import { MatchService } from './services/match.service';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public seasonService: SeasonService,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public websocketService: WebsocketService,
    private matchService: MatchService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
    private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.loadGoogleMapsScript();
    if (this.authService.accessToken) {
      await this.authService.loadUser();
    }
    this.matchService.matchUpdated.subscribe(
      (data) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('RESULT_UPDATED', { homeTeam: data.homeTeamName, guestTeam: data.guestTeamName })
          },
          panelClass: ['alert', 'alert-info']
        });
      });
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangepasswordComponent);
  }

  loadGoogleMapsScript() {
    const googleMapsJS = document.getElementById('googelmapsscript');
    if (!googleMapsJS) {
      const tag = document.createElement('script');
      tag.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey + '&libraries=places';
      tag.type = 'text/javascript';
      tag.id = 'googelmapsscript';
      document.body.appendChild(tag);
    }
  }

  onLangSelect(lang: string) {
    this.i18Service.changeLang(lang);
  }
}

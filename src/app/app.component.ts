import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { environment } from 'src/environments/environment';
import { I18Service } from './services/i18.service';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { RedisEventGQL } from '../api/graphqlsubs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private redis: RedisEventGQL) {
  }

  async ngOnInit() {
    if (this.authService.accessToken) {
      this.authService.loadUser();
    }
    this.loadGoogleMapsScript();
    this.redis.subscribe().subscribe(
      (message) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Redis said: ${ JSON.stringify(message)}`
          },
          panelClass: ['alert', 'alert-info'],
          duration: 2000
        });
      }
    );
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

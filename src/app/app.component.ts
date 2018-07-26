import { Component, OnInit } from '@angular/core';
import { SeasonService } from './services/season.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { environment } from 'src/environments/environment';
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
    public i18Service: I18Service,
    private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.loadGoogleMapsScript();
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

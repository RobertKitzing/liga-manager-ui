import { MatchService } from './service/match.service';
import { WebsocketService } from './service/websocket.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs/observable/merge';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { SeasonService } from '@app/service/season.service';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { AuthenticationService } from '@app/service/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '@app/account/login.component';
import { ChangePasswordComponent } from '@app/account/changepassword/changepassword.component';
registerLocaleData(de);

const log = new Logger('App');
export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private zone: NgZone,
    private keyboard: Keyboard,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private i18nService: I18nService,
    private seasonService: SeasonService,
    public authService: AuthenticationService,
    private dialog: MatDialog
  ) {

  }

  async ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.loadGoogleMapsScript();

    if (this.authService.isAuthenticated) {
      await this.authService.loadUser();
    }

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
    // Cordova platform and plugins initialization
    document.addEventListener('deviceready', () => {
      this.zone.run(() => this.onCordovaReady());
    }, false);

    if (this.authService.credentials && (!this.authService.credentials.firstName || !this.authService.credentials.lastName)) {
      // bugfix für ältere logins
      this.authService.logout();
    }
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

  private onCordovaReady() {
    if (window['cordova']) {
      this.keyboard.hideKeyboardAccessoryBar(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get username(): string {
    const credentials = this.authService.credentials;
    return credentials ? credentials.username : null;
  }

  logout() {
    this.authService.logout();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.authService.logout();
        }
      }
    );
  }
}

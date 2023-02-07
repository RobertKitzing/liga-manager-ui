import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { I18nService } from './services/i18n.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { ThemeService } from './services/theme.service';
import { Location } from '@angular/common'
import { SeasonService } from './services/season.service';

@Component({
  selector: 'lima-root',
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  darkModeControl = new FormControl(this.themeService.darkMode$.getValue());
  currentSeason$ = this.seasonService.currentSeason$;

  get currentRoute() {
    const url = this.router.url.split('/')[1]
    return `NAVIGATION.${url.toUpperCase()}`;
  }

  constructor(
    public themeService: ThemeService,
    public loadingIndicatorService: LoadingIndicatorService,
    public authService: AuthenticationService,
    public i18Service: I18nService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private seasonService: SeasonService,
  ) { }

  async ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params) => {
          if (params['theme'])
            this.changeTheme(params['theme']);
        }
      );

    this.darkModeControl.valueChanges.subscribe(
      (dark) => {
        this.themeService.darkMode$.next(dark!);
      }
    )
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {

  }

  changeTheme(theme: string) {
    this.themeService.currentTheme$.next(theme);
  }

  changeLang(param: { code: string, direction?: string }) {
    this.i18Service.changeLang(param);
  }

  onSwipeLeft() {
    this.location.back();
  }

  onSwipeRight() {
    this.location.forward();
  }
}

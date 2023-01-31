import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { I18nService } from './services/i18n.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { ThemeService } from './services/theme.service';
import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { AllSeasonsListGQL } from 'src/api/graphql';
import { SeasonService } from './services/season.service';

@Component({
  selector: 'lima-root',
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  darkModeControl = new FormControl();
  currentSeason$ = this.seasonService.currentSeason$;

  get currentRoute() {
    return `NAVIGATION.${this.router.url.replace('/', '').toUpperCase()}`;
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

    this.themeService.darkMode$.subscribe(
      (darkMode) => {
        this.darkModeControl.setValue(darkMode, { emitEvent: false });
      }
    );
    this.darkModeControl.valueChanges.subscribe(
      (dark) => {
        this.themeService.darkMode$.next(dark);
      }
    )
    this.seasonService.seasonsInProgress$.pipe(take(1)).subscribe();
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

  async clearCache() {
    await firstValueFrom(this.i18Service.clearCache());
  }

  onSwipeLeft() {
    this.location.back();
  }

  onSwipeRight() {
    this.location.forward();
  }
}

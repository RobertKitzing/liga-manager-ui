import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { I18Service } from './services/i18.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'lima-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  darkModeControl = new FormControl();

  constructor(
    public themeService: ThemeService,
    public loadingIndicatorService: LoadingIndicatorService,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        (params) => {
          if (params['theme'])
            this.changeTheme(params['theme']);
        }
      );
    const darkMode = firstValueFrom(this.themeService.darkMode$);
    this.darkModeControl.setValue(darkMode);
    this.darkModeControl.valueChanges.subscribe(
      (dark) => {
        this.themeService.darkMode$.next(dark);
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

  changeLang(lang: string) {
    this.i18Service.changeLang(lang);
  }
}

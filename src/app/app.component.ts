import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'lima-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    public loadingIndicatorService: LoadingIndicatorService,
    public authService: AuthenticationService,
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
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {

  }

  changeTheme(theme: string) {
    this.themeService.currentTheme$.next(theme);
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    this.themeService.setDarkmode(event.checked);
  }
}

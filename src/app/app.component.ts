import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  ) { }

  ngOnInit(): void {

  }

  changeTheme(theme: string) {
    this.themeService.currentTheme$.next(theme);
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    this.themeService.setDarkmode(event.checked);
  }
}

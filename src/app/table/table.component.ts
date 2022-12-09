import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'lima-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  constructor(
    private themeService: ThemeService,
  ) { }

  changeTheme(theme: string) {
    this.themeService.loadStyle(theme);
  }

  toggleDarkMode(event: MatSlideToggleChange) {
    console.log(event);
    this.themeService.setDarkmode(event.checked)
  }
}

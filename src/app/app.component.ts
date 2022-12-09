import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'lima-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.loadStyle('default')
  }

}

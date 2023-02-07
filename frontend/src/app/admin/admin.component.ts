import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lima-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent {

  get currentRoute() {
    const url = this.router.url.split('/')[2]
    return `NAVIGATION.ADMIN.${url?.toUpperCase()}`;
  }

  constructor(
    private router: Router,
  ) {

  }
}

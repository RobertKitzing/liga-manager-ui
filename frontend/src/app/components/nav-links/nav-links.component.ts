import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'lima-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {

  constructor(
    public authService: AuthenticationService
  ) {

  }

}

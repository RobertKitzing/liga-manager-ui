import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '@app/service/authentication.service';
import { Logger } from '../logger.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authenticationService.isAdminUser) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}

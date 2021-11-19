import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthenticationService
  ) {

  }

  canActivate() {
    return this.authService.isAdmin;
  }

  canLoad() {
    return this.authService.isAdmin;
  }
}

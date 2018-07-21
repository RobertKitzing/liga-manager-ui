import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserRole } from '../../../api';

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

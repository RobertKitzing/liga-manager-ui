import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class TeamAdminGuard {
    get allowed() {
        return this.authenticationService.isTeamAdmin;
    }

    constructor(private authenticationService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.allowed;
    }
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.allowed;
    }
}

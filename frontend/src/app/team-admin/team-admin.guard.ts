import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { AuthenticationService } from '@lima/shared/services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TeamAdminGuard {
    get allowed() {
        return this.authenticationService.isTeamAdmin;
    }

    constructor(private authenticationService: AuthenticationService) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.allowed;
    }
    canActivateChild():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.allowed;
    }
}

import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { AuthenticationService } from '@lima/shared/services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TeamsManagementGuard {

    constructor(private authenticationService: AuthenticationService) {}

    get allowed() {
        return this.authenticationService.isTeamAdmin;
    }

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

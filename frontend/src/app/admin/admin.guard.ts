import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard {
    get allowed() {
        return this.authenticationService.isAdmin;
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

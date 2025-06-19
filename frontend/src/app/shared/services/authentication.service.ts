import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
import {
    Match,
    PasswordChangeGQL,
    PasswordResetGQL,
    User,
    AuthenticatedUserGQL,
    UserRole,
} from '@api/graphql';

export interface LoginContext {
    username: string;
    password: string;
}

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    @LocalStorage(ACCESS_TOKEN_KEY) accessToken?: string;

    user?: User;

    get isAuthenticated(): boolean {
        return !!this.user && Boolean(this.accessToken);
    }

    get isAdmin() {
        return this.user ? this.user.role === UserRole.Admin : false;
    }

    get isTeamAdmin() {
        return this.user ? this.user.role === UserRole.TeamManager : false;
    }

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
    ) {

    }

    logout() {
        this.localStorageService.clear(ACCESS_TOKEN_KEY);
        this.user = undefined;
        this.router.navigateByUrl('');
    }
    
}

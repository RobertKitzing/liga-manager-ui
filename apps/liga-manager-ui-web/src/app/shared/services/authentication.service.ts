import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { User, UserRole } from '@liga-manager-api/graphql';

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

    user = signal<User | undefined>(undefined);

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
    ) {}

    get isAdmin() {
        return this.user() ? this.user()?.role === UserRole.Admin : false;
    }

    get isTeamAdmin() {
        return this.user() ? this.user()?.role === UserRole.TeamManager : false;
    }

    logout() {
        this.localStorageService.clear(ACCESS_TOKEN_KEY);
        this.user.set(undefined);
        this.router.navigateByUrl('');
    }

}

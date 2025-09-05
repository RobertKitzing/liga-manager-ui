import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '@liga-manager-api/graphql';
import { fromStorage } from '../functions';
import { StorageKeys } from '@liga-manager-ui/common';

export interface LoginContext {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    accessToken = fromStorage<string>(StorageKeys.ACCESS_TOKEN);

    user = signal<User | undefined>(undefined);

    private router = inject(Router);

    get isAdmin() {
        return this.user() ? this.user()?.role === UserRole.Admin : false;
    }

    get isTeamAdmin() {
        return this.user() ? this.user()?.role === UserRole.TeamManager : false;
    }

    logout() {
        this.accessToken.set(null);
        this.user.set(undefined);
        this.router.navigateByUrl('');
    }

}

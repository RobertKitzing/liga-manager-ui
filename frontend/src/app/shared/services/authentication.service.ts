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

    constructor(
        private router: Router,
        private authenticatedUserGQL: AuthenticatedUserGQL,
        private changePasswordQGL: PasswordChangeGQL,
        private resetPasswordQGL: PasswordResetGQL,
        private localStorageService: LocalStorageService,
    ) {}

    get isAuthenticated(): boolean {
        return !!this.user && Boolean(this.accessToken);
    }

    get isAdmin() {
        return this.user ? this.user.role === UserRole.Admin : false;
    }

    get isTeamAdmin() {
        return this.user ? this.user.role === UserRole.TeamManager : false;
    }

    login(context: LoginContext) {
        return this.authenticatedUserGQL
            .fetch(undefined, {
                fetchPolicy: 'network-only',
                context: {
                    headers: new HttpHeaders().set(
                        'Authorization',
                        `Basic ${Base64.encode(
                            context.username.toLowerCase() +
                                ':' +
                                context.password,
                        )}`,
                    ),
                },
            })
            .pipe(
                tap((result) => {
                    this.user = result.data.authenticatedUser as User;
                }),
            );
    }

    loadUser() {
        return this.authenticatedUserGQL.fetch().pipe(
            tap((result) => {
                this.user = result.data.authenticatedUser as User;
            }),
        );
    }

    logout() {
        this.localStorageService.clear(ACCESS_TOKEN_KEY);
        this.user = undefined;
        this.router.navigateByUrl('');
    }

    isTeamAdminForTeam(teamId: string) {
        return (
            this.isTeamAdmin &&
            !!this.user?.teams?.find((t) => t?.id === teamId)
        );
    }

    canEditMatch(match: Match) {
        return (
            this.isAdmin ||
            this.isTeamAdminForTeam(match.home_team.id) ||
            this.isTeamAdminForTeam(match.guest_team.id)
        );
    }

    changePassword(newPassword: string, oldPassword: string) {
        return this.changePasswordQGL.mutate(
            {
                new_password: newPassword,
            },
            {
                context: {
                    headers: new HttpHeaders().set(
                        'Authorization',
                        `Basic ${Base64.encode(
                            this.user?.email.toLowerCase() + ':' + oldPassword,
                        )}`,
                    ),
                },
            },
        );
    }

    setPassword(newPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.changePasswordQGL
                .mutate({
                    new_password: newPassword,
                })
                .subscribe(
                    () => {
                        resolve();
                    },
                    (err) => {
                        reject(err);
                    },
                );
        });
    }

    sendPasswordMail(email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.resetPasswordQGL
                .mutate({
                    email: email,
                    target_path: 'newpassword',
                })
                .subscribe(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    },
                );
        });
    }
}

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { UserGQL, User, UserRole, PasswordChangeGQL, PasswordResetGQL } from '../../api/graphql';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { firstValueFrom, tap } from 'rxjs';

export interface LoginContext {
  username: string;
  password: string;
}

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  user: User;

  @LocalStorage(ACCESS_TOKEN_KEY) accessToken: string;

  public get isAuthenticated(): boolean {
    return this.user && Boolean(this.accessToken);
  }

  constructor(
    private router: Router,
    private userQGL: UserGQL,
    private changePasswordQGL: PasswordChangeGQL,
    private resetPasswordQGL: PasswordResetGQL,
    private localStorageService: LocalStorageService
  ) {
  }

  async init() {
    try {
      this.user = await this.loadUser();
    } catch (error) {
      console.error(error);
    }
  }

  async loginAsync(context: LoginContext): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {
        this.userQGL.fetch(
          null,
          {
            fetchPolicy: 'network-only',
            context: {
              headers: new HttpHeaders()
                .set('Authorization', `Basic ${Base64.encode(context.username.toLowerCase() + ':' + context.password)}`)
            }
          }
        ).subscribe(
          (result) => {
            this.user = result.data.authenticatedUser;
            resolve(true);
          },
          (error) => {
            this.logout();
            reject(error);
          });

      });
  }

  async loadUser(): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.userQGL.fetch().subscribe(
          (result) => {
            this.user = result.data.authenticatedUser;
            resolve(result.data.authenticatedUser);
          },
          (error) => {
            this.logout();
            reject(error);
          });
      });
  }

  logout() {
    this.localStorageService.clear(ACCESS_TOKEN_KEY);
    this.user = null;
    this.router.navigateByUrl('');
  }

  public get isAdmin() {
    return this.user ? this.user.role === UserRole.Admin : false;
  }

  public get isTeamAdmin() {
    return this.user ? this.user.role === UserRole.TeamManager : false;
  }

  public isTeamAdminForTeam(teamId: string) {
    return this.isTeamAdmin && this.user.teams.find(t => t.id === teamId);
  }

  changePassword(newPassword: string, oldPassword: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.changePasswordQGL.mutate(
          {
            new_password: newPassword
          },
          {
            context: {
              headers:
              new HttpHeaders()
                .set('Authorization', `Basic ${Base64.encode(this.user.email.toLowerCase() + ':' + oldPassword)}`)
            }
          }
        ).subscribe(
          (response) => {
            resolve();
          }, err => {
            reject(err);
          });
      }
    );
  }

  setPassword(newPassword: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.changePasswordQGL.mutate(
          {
            new_password: newPassword
          }
        ).subscribe(
          (response) => {
            resolve();
          }, err => {
            reject(err);
          });
      }
    );
  }

  sendPasswordMail(email: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.resetPasswordQGL.mutate(
          {
            email: email,
            target_path: 'newpassword'
          }
        ).subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}

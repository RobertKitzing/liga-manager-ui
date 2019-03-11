import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { UserGQL, User, UserRole, PasswordChangeGQL, PasswordResetGQL } from '../../api/graphql';

export interface LoginContext {
  username: string;
  password: string;
}

export interface Credentials {
  token: string;
}

@Injectable({
  providedIn: 'root',
  useExisting: AuthenticationService
})
export class AuthenticationService {

  user: User.AuthenticatedUser;

  public setAccessToken(value: Credentials) {
    localStorage.setItem('ACCESS_TOKEN', JSON.stringify(value));
  }

  public get accessToken(): string {
    const cred: Credentials = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    return cred ? cred.token : null;
  }

  public get isAuthenticated(): boolean {
    return this.user && Boolean(this.accessToken);
  }

  constructor(
    private router: Router,
    private userQGL: UserGQL,
    private changePasswordQGL: PasswordChangeGQL,
    private resetPasswordQGL: PasswordResetGQL
  ) {
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

  async loadUser(): Promise<User.AuthenticatedUser> {
    return new Promise<User.AuthenticatedUser>(
      (resolve, reject) => {
        this.userQGL.watch().valueChanges.subscribe(
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
    this.setAccessToken(null);
    this.user = null;
    this.router.navigateByUrl('');
  }

  public get isAdmin() {
    return this.user ? this.user.role === UserRole.Admin : false;
  }

  public get isTeamAdmin() {
    return this.user ? this.user.role === UserRole.TeamManager : false;
  }

  public isTeamAdminForTeam(teamId) {
    return this.isTeamAdmin && this.user.teams.find(t => t === teamId);
  }

  changePassword(newPassword: string, oldPassword?: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.changePasswordQGL.mutate(
          {
            new_password: newPassword
          },
          {
            context: {
              headers: oldPassword ?
                new HttpHeaders().set('Authorization', 'Basic ' + Base64.encode(this.user.email.toLowerCase() + ':' + oldPassword)) : null
            }
          }
        ).subscribe(
          (response) => {
            resolve();
          }, err => {
            reject();
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

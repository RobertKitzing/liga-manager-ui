import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client, User, UserRole, ChangePasswordBody } from '@app/api/openapi';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Base64 } from 'js-base64';

export interface Credentials {
  // Customize received credentials here
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  private user: User;

  constructor(private apiClient: Client,
    private httpClient: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  async loginAsync(context: LoginContext): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        let headers = new HttpHeaders();
        const passBase64 = Base64.encode(context.username.toLowerCase() + ':' + context.password);
        headers = headers.append('Authorization', 'Basic ' + passBase64);
        this.httpClient.get('/api/user/me', { headers: headers, observe: 'response' }).subscribe(
          (response) => {
            const data = {
              username: response.body['email'],
              firstName: response.body['first_name'],
              lastName: response.body['last_name'],
              token: response.headers.get('x-token')
            };
            this.setCredentials(data, context.remember);
            this.user = <User>response.body;
            resolve(true);
          }, err => {
            resolve(false);
          });
      });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        let headers = new HttpHeaders();
        const passBase64 = Base64.encode(this.credentials.username.toLowerCase() + ':' + oldPassword);
        headers = headers.append('Authorization', 'Basic ' + passBase64);
        headers = headers.append('Content-Type', 'application/json; charset=utf-8');
        const body = new ChangePasswordBody();
        body.new_password = newPassword;
        this.httpClient.put('/api/user/me/password', JSON.stringify(body), {headers: headers }).subscribe(
          (response) => {
            resolve(true);
          }, err => {
            resolve(false);
          });
      }
    );
  }
  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  public getAccessToken(): string | null {
    return this._credentials ? this._credentials.token : null;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  async loadUser(): Promise<User> {
    return new Promise<User>(
      (resolve) => {
        this.apiClient.getAuthenticatedUser().subscribe(
          (user) => {
            this.user = user;
            resolve(user);
          },
          (error) => {
            this.logout();
            resolve(null);
          });
      });
  }

  public isUserInTeam(teamId: string): boolean {
    return this.isAuthenticated && this.user && this.user.teams.indexOf(teamId) !== -1;
  }

  public get isAdminUser(): boolean {
    return this.isAuthenticated && this.user && this.user.role === UserRole.Admin;
  }
}

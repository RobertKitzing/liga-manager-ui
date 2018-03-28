import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client, API_BASE_URL } from './../../api/openapi';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export interface Credentials {
  // Customize received credentials here
  username: string;
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

  constructor(private apiClient: Client,
              private httpClient: HttpClient,
              @Inject(API_BASE_URL) private baseUrl: string) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    let headers = new HttpHeaders();
    let token: string;
    headers = headers.append('Authorization', 'Basic ' + btoa(context.username + ':' + context.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.httpClient.get(this.baseUrl + '/api/user/me', { headers: headers, observe: 'response' }).subscribe(
      (response) => {
          const keys = response.headers.keys();
          const respHeaders = keys.map(key =>
            `${key}: ${response.headers.get(key)}`);
          token = respHeaders['xtoken'];
          console.log(respHeaders);
    }, err => {
       console.log('User authentication failed!');
       this.logout();
    });

    const data = {
      username: context.username,
      // tslint:disable-next-line:max-line-length
      token: token ? token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkN2JkODMyNS1kNjllLTQ3MDUtODg1MC1iNTEwNzI5YTM5OGQiLCJpYXQiOiIyMDE4LTAzLTI4VDE4OjMzOjQ0KzAyOjAwIn0.3-CqDg_YTXtVlIhi1vKYDCTnPE6ttP94lvmHXC7tOvQ'
    };
    this.setCredentials(data, context.remember);
    return of(data);
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
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  public getAccessToken(): string {
    return this._credentials.token;
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

  public isUserInTeam(teamId: string[]) {
    console.log(teamId);
    return this.isAuthenticated;
  }
}

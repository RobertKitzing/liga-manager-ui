import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Client, UserRole, ChangePasswordBody } from '../../api';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';


export interface LoginContext {
  username: string;
  password: string;
}

class Credentials {
  constructor(public token: string) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;

  private setAccessToken(value: Credentials) {
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
    private apiClient: Client,
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  async loginAsync(context: LoginContext): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        let headers = new HttpHeaders();
        const passBase64 = Base64.encode(context.username.toLowerCase() + ':' + context.password);
        headers = headers.append('Authorization', 'Basic ' + passBase64);
        this.httpClient.get('/api/user/me', { headers: headers, observe: 'response' }).subscribe(
          async (response) => {
            const data = {
              username: response.body['email'],
              firstName: response.body['first_name'],
              lastName: response.body['last_name'],
              token: response.headers.get('x-token')
            };
            this.setAccessToken(new Credentials(data.token));
            this.user = await this.loadUser();
            if (!this.user) {
              resolve(false);
            }
            resolve(true);
          }, err => {
            resolve(false);
          });
      });
  }

  async loadUser(): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.apiClient.getAuthenticatedUser().subscribe(
          (user) => {
            this.user = user;
            resolve(user);
          },
          (error) => {
            this.logout();
            reject(error);
          },
          () => {
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
    return this.user ? this.user.role === UserRole.Team_manager : false;
  }

  public isTeamAdminForTeam(teamId) {
    return this.isTeamAdmin && this.user.teams.find(t => t === teamId);
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        let headers = new HttpHeaders();
        const passBase64 = Base64.encode(this.user.email.toLowerCase() + ':' + oldPassword);
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
}

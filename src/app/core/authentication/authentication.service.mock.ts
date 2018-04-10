import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    username: 'test',
    firstName: 'test',
    lastName: 'test',
    token: '123'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      firstName: 'test',
      lastName: 'test',
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}

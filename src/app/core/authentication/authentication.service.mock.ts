import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    email: 'test@test.com',
    token: '123',
    user_id: 100,
    confirmed: true
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      email: context.email,
      token: '123456',
      user_id: 100,
      confirmed: true
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

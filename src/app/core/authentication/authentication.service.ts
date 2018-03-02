import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export interface Credentials {
  // Customize received credentials here
  email: string;
  token: string;
  user_id: number;
  confirmed: boolean;
}

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ConfirmationContext {
  code: string;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor() {
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
    // Replace by proper registration call

    const data = {
      email: context.email,
      token: '123456',
      user_id: 100,
      confirmed: true
    };
    this.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Registers the user.
   * @param {RegisterContext} context The registration parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  register(context: RegisterContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      email: context.email,
      token: '123456',
      user_id: 100,
      confirmed: false
    };
    this.setCredentials(data, false);
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
   * Confirms the authentication code is successful.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  confirm(context: ConfirmationContext): Observable<Credentials> {
    // Get the credentials
    const data = this.credentials;

    data.confirmed = true;

    this.setCredentials(data, false);
    return of(data);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Checks is the user has confirmed their account.
   * @return {boolean} True if the user's account has been confirmed.
   */
  isConfirmed(): boolean {
    return !!this.credentials.confirmed;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
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

}

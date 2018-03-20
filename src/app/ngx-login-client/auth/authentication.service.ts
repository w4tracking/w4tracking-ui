import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Broadcaster } from '../../ngx-base';

import { AUTH_API_URL } from '../shared/auth-api';
import { SSO_API_URL } from '../shared/sso-api';
import { REALM } from '../shared/realm-token';
import { Token } from '../user/token';

export type ProcessTokenResponse = (response: any) => Token;

@Injectable()
export class AuthenticationService {

  // Tokens
  readonly google = 'google';

  private refreshInterval: number;
  private apiUrl: string;
  private ssoUrl: string;
  private realm: string;
  private clearTimeoutId: any;
  private refreshTokens: Subject<Token> = new Subject();

  constructor(
    private broadcaster: Broadcaster,
    @Inject(AUTH_API_URL) apiUrl: string,
    @Inject(SSO_API_URL) ssoUrl: string,
    @Inject(REALM) realm: string,
    private http: HttpClient) {
    this.apiUrl = apiUrl;
    this.ssoUrl = ssoUrl;
    this.realm = realm;
  }

  logout() {
    this.broadcaster.broadcast('logout', 1);
    this.logout();
  }

}

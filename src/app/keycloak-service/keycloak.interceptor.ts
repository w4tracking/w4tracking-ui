import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { KeycloakService } from './keycloak.service';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

  private MAX_UNAUTHORIZED_ATTEMPTS = 2;

  constructor(
    private keycloakService: KeycloakService
  ) { }

  private handleError(err: any, request: HttpRequest<any>, next: HttpHandler) {
    if (err instanceof HttpErrorResponse) {
      const wwwAuthenticateHeader = err.headers.get('WWW-Authenticate');

      const rptPromise: Promise<string> = this.keycloakService.authorize(wwwAuthenticateHeader);
      const rptObservable: Observable<string> = Observable.fromPromise(rptPromise);

      // return next.handle(request);
      return rptObservable.switchMap(() => {
        const newReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.keycloakService.rpt()}`
          }
        });

        return next.handle(newReq);
      });
    } else {
      return Observable.throw(err);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.keycloakService.authenticated()) { return next.handle(request); }

    let result: Observable<HttpEvent<any>>;

    if (this.keycloakService.authorization() && this.keycloakService.rpt() && request.url.indexOf('/authorize') === -1) {
      const retries = 0;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.keycloakService.rpt()}`
        }
      });
      result = next.handle(request).catch(error => {
        return this.handleError(error, request, next);
      });
    } else {
      const tokenPromise: Promise<string> = this.keycloakService.getToken();
      const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);

      result = tokenObservable
        .map((token) => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return request;
        })
        .concatMap((newRequest) => {
          return next.handle(newRequest);
        })
        .catch((error) => {
          return this.handleError(error, request, next);
        });
    }

    return result;

    // if (err.url.indexOf('/authorize') === -1) {
    //   const rptPromise: Promise<string> = this.keycloakService.authorize((err.headers.get('WWW-Authenticate')));
    //   const rptObservable: Observable<string> = Observable.fromPromise(rptPromise);

    //   // return next.handle(request);
    //   rptObservable.subscribe((val) => {
    //     console.log("rpt result", val);
    //   });
    // }

  }
}

export const KEYCLOAK_HTTP_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakInterceptor,
  multi: true
};

import { Injectable } from '@angular/core';

// If using a local keycloak.js, uncomment this import.  With keycloak.js fetched
// from the server, you get a compile-time warning on use of the Keycloak()
// method below.  I'm not sure how to fix this, but it's certainly cleaner
// to get keycloak.js from the server.
//
import * as Keycloak from './keycloak';
import * as KeycloakAuthorization from './keycloak-authz';

type KeycloakClient = Keycloak.KeycloakInstance;
type InitOptions = Keycloak.KeycloakInitOptions;

type KeycloakIdentity = KeycloakAuthorization.KeycloakAuthorizationInstance;

@Injectable()
export class KeycloakService {
  static keycloakAuth: KeycloakClient;
  static keycloakAuthz: KeycloakIdentity;

  /**
   * Configure and initialize the Keycloak adapter.
   *
   * @param configOptions Optionally, a path to keycloak.json, or an object containing
   *                      url, realm, and clientId.
   * @param adapterOptions Optional initiaization options.  See javascript adapter docs
   *                       for details.
   * @returns {Promise<T>}
   */
  static init(initOptions?: InitOptions, activateAuthz: boolean = false): Promise<any> {
    const configOptions: string | {} = {
      realm: window['W4TrackingUIEnv']['realm'] || 'w4tracking',
      url: window['W4TrackingUIEnv']['ssoApiUrl'],
      clientId: window['W4TrackingUIEnv']['clientId'] || 'w4tracking-html5-client'
    };

    KeycloakService.keycloakAuth = Keycloak(configOptions);

    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth.init(initOptions)
        .success(() => {
          if (activateAuthz) {
            KeycloakService.keycloakAuthz = KeycloakAuthorization(KeycloakService.keycloakAuth);
          }
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    });
  }

  authenticated(): boolean {
    return KeycloakService.keycloakAuth.authenticated;
  }

  login() {
    KeycloakService.keycloakAuth.login();
  }

  logout() {
    KeycloakService.keycloakAuth.logout();
  }

  account() {
    KeycloakService.keycloakAuth.accountManagement();
  }

  authServerUrl(): string {
    return KeycloakService.keycloakAuth.authServerUrl;
  }

  realm(): string {
    return KeycloakService.keycloakAuth.realm;
  }

  manageAccount(): void {
    KeycloakService.keycloakAuth.accountManagement();
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.keycloakAuth.token) {
        KeycloakService.keycloakAuth
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.keycloakAuth.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }

  // Authz

  authorization(): boolean {
    return KeycloakService.keycloakAuthz !== null;
  }

  rpt(): string {
    return KeycloakService.keycloakAuthz.rpt;
  }

  /**
   *
   * @param wwwAuthenticateHeader
   */
  authorize(wwwAuthenticateHeader: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      KeycloakService.keycloakAuthz
        .authorize(wwwAuthenticateHeader)
        .then(
          () => {
            resolve(<string>KeycloakService.keycloakAuthz.rpt);
          },
          () => {
            reject('You can not access or perform the requested operation on this resource.');
          },
          () => {
            reject('Unexpected error from server.');
          }
        );
    });
  }
}

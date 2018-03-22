import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Api Config
import { w4trackingUIConfigProvider } from './shared/w4tracking-ui-config.service';
import { ApiLocatorService } from './shared/api-locator.service';

// Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Error
import { ErrorService } from './layout/error/error.service';

// Ngx
import { NgxBaseModule } from './ngx-base/ngx-base.module';
import { NxgLoginModule } from './ngx-login-client/ngx-login.module';
import { NgxW4TrackingModule } from './ngx-w4tracking/ngx-w4tracking.module';

import { ssoApiUrlProvider } from './shared/sso-api.provider';
import { authApiUrlProvider } from './shared/auth-api.provider';
import { realmProvider } from './shared/realm-token.provider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Bootstrap
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),

    NgxBaseModule.forRoot(),
    NxgLoginModule.forRoot(),
    NgxW4TrackingModule.forRoot()
  ],
  providers: [
    // Api Config
    w4trackingUIConfigProvider,
    ApiLocatorService,

    // Error
    ErrorService,

    // Ngx
    ssoApiUrlProvider,
    authApiUrlProvider,
    realmProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

import { NxgLoginModule } from '../../ngx-login-client/ngx-login.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    NxgLoginModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }

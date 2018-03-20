import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CompanyNamePipe } from './companies/company-name.pipe';
import { NgxBaseModule } from '../ngx-base/ngx-base.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxBaseModule
  ],
  declarations: [
    CompanyNamePipe,
  ],
  exports: [
    CompanyNamePipe,
  ],
  providers: [
    CompanyNamePipe
  ]
})
export class W4TrackingModule {
}

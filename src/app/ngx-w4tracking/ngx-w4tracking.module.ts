import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgxBaseModule } from '../ngx-base/ngx-base.module';

import { CompanyNamePipe } from './companies/company-name.pipe';
import { CompanyService } from './companies/company.service';

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
  providers: []
})
export class NgxW4TrackingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxW4TrackingModule,
      providers: [
        CompanyService
      ]
    };
  }

}

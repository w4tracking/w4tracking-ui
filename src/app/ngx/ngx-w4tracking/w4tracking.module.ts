import { NgModule } from '@angular/core';
import { CompanyNamePipe } from './companies/company-name.pipe';

@NgModule({
  imports: [
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

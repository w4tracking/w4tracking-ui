import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CompaniesComponent],
  exports: [CompaniesComponent]
})
export class CompaniesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorizontalNavigationComponent } from './horizontal-navigation.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CompanyWizardModule } from './../../company-wizard/company-wizard.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    CompanyWizardModule
  ],
  declarations: [
    HorizontalNavigationComponent
  ],
  exports: [
    HorizontalNavigationComponent
  ]
})
export class HorizontalNavigationModule { }

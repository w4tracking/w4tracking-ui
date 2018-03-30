import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyWizardComponent } from './company-wizard.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WizardModule } from 'patternfly-ng/wizard';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WizardModule,
    ModalModule
  ],
  declarations: [CompanyWizardComponent],
  exports: [CompanyWizardComponent],
  providers: [BsModalService]
})
export class CompanyWizardModule { }

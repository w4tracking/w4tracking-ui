import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { ActivityModule } from './activity/activity.module';
import { CompaniesModule } from './companies/companies.module';

import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ActivityModule,
    CompaniesModule,

    TabsModule
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }

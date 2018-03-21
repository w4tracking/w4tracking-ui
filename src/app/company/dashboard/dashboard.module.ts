import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dasboard-routing.module';

import { NavigationModule } from 'patternfly-ng/navigation';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,

    NavigationModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

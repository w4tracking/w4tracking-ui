import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { OverviewModule } from './overview/overview.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    OverviewModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }

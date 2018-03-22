import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { HorizontalNavigationModule } from './../layout/horizontal-navigation/horizontal-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    HorizontalNavigationModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorizontalNavigationComponent } from './horizontal-navigation.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule
  ],
  declarations: [
    HorizontalNavigationComponent
  ],
  exports: [
    HorizontalNavigationComponent
  ]
})
export class HorizontalNavigationModule { }

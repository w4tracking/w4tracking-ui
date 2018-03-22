import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalNavigationComponent } from './vertical-navigation.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [VerticalNavigationComponent],
  exports: [VerticalNavigationComponent]
})
export class VerticalNavigationModule { }

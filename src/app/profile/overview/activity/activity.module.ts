import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ActivityComponent],
  exports: [ActivityComponent]
})
export class ActivityModule { }

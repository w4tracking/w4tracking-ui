import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from 'patternfly-ng/notification';

import { Broadcaster } from './broadcaster.service';
import { Logger } from './logger.service';
import { NotificationsService } from './notifications/notifications.service';
import { Notifications } from './notifications/notifications';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule
  ],
  declarations: []
})
export class NgxBaseModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxBaseModule,
      providers: [
        Broadcaster,
        Logger,
        NotificationsService,
        {
          provide: Notifications,
          useExisting: NotificationsService
        }
      ]
    };
  }

}

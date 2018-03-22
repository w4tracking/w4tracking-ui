import {
  Component,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from '../../ngx-login-client';
import 'rxjs/operators/map';
import { Subscription } from 'rxjs/Subscription';

import { ErrorService } from './error.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'w4-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {

  message = '';
  subscription: Subscription;
  hideBanner: boolean;
  companyLink: string;
  userSubscription: Subscription;

  constructor(
    private errorService: ErrorService,
    router: Router,
    userService: UserService,
    authService: AuthenticationService) {
    this.subscription = this.errorService.update$.subscribe(
      message => {
        this.message = message;
      });

    this.userSubscription = userService.loggedInUser.subscribe(val => {
      if (val.id) {
        this.companyLink = '/' + val.attributes.username + '/_companies';
      }
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

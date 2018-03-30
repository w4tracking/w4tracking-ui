import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserService } from '../../ngx-login-client';

@Component({
  selector: 'w4-horizontal-navigation',
  templateUrl: './horizontal-navigation.component.html',
  styleUrls: ['./horizontal-navigation.component.scss']
})
export class HorizontalNavigationComponent implements OnInit, OnDestroy {

  loggedInUser: User;
  private subcriptions: Subscription[] = [];

  constructor(private userService: UserService) {
    this.subcriptions.push(
      userService.loggedInUser.subscribe((val) => this.loggedInUser = val)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcriptions.forEach((val) => val.unsubscribe());
  }

}

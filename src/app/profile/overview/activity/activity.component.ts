import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Activity {
  public what: string;
  public when: string;
}

@Component({
  selector: 'w4-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  public activityItems: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Actions

  public routeToHome(): void {
    this.router.navigate(['/', '_home']);
  }

}

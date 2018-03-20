import { Component, OnInit, Input } from '@angular/core';
import { showStateTrigger } from './animations';

@Component({
  selector: 'w4-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [showStateTrigger]
})
export class LoadingComponent implements OnInit {

  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrl: './online-status.component.css'
})
export class OnlineStatusComponent {
  @Input() onlineStatusMessage!: string;
  @Input() onlineStatus!: string;
  constructor() { }

}

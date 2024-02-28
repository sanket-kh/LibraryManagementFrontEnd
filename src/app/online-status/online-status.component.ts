import {Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-online-status',
    templateUrl: './online-status.component.html',
    styleUrl: './online-status.component.css',
    standalone: true,
    imports: [NgIf]
})
export class OnlineStatusComponent {
  @Input() onlineStatusMessage!: string;
  @Input() onlineStatus!: string;
  constructor() { }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-accordion',
  templateUrl: './admin-accordion.component.html',
  styleUrl: './admin-accordion.component.css'
})
export class AdminAccordionComponent {
 @Input('header') header: string=''
  @Input('component') template?:Component

}

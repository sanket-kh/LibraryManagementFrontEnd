import {Component, Input} from '@angular/core';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-admin-accordion',
    templateUrl: './admin-accordion.component.html',
    styleUrl: './admin-accordion.component.css',
    standalone: true,
    imports: [NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody]
})
export class AdminAccordionComponent {
 @Input('header') header: string=''
  @Input('component') template?:Component

}

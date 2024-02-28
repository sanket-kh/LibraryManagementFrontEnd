import {Component, inject, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../UserComponents/services/authentication.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    standalone: true
})
export class FooterComponent implements OnInit{
  userService: AuthenticationService = inject(AuthenticationService)
  @Input() footerColor!: string;
  ngOnInit(): void {

  }

}

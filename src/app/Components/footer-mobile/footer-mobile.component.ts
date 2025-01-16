import { Component } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";

@Component({
  selector: 'app-footer-mobile',
  standalone: true,
  imports: [BottomNavbarComponent],
  templateUrl: './footer-mobile.component.html',
  styleUrl: './footer-mobile.component.scss'
})
export class FooterMobileComponent {

}

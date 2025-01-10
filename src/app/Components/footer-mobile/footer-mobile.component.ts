import { Component } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { PaginationBarComponent } from "../pagination-bar/pagination-bar.component";

@Component({
  selector: 'app-footer-mobile',
  standalone: true,
  imports: [BottomNavbarComponent, PaginationBarComponent],
  templateUrl: './footer-mobile.component.html',
  styleUrl: './footer-mobile.component.scss'
})
export class FooterMobileComponent {

}

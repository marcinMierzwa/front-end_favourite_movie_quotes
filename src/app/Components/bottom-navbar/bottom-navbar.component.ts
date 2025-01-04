import { Component } from '@angular/core';
import { IconBox } from './model/icon-box.interface';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent {
   
  iconsBox: IconBox[] = [
    {
      title: 'Search',
      className: 'bi bi-search'
    },
    {
      title: 'Filter',
      className: 'bi bi-filter-circle'
    },
    {
      title: 'Favourites',
      className: 'bi bi-heart'
    },
    {
      title: 'Acccount',
      className: 'bi bi-person-circle'
    },
  ]
  

}

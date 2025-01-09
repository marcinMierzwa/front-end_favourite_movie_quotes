import { Injectable } from '@angular/core';
import { IconBox } from '../Components/bottom-navbar/model/icon-box.interface';

@Injectable({
  providedIn: 'root',
})
export class BottomNavbarService {
  private readonly iconsBox: IconBox[] = [
    {
      title: 'Home',
      className: 'bi bi-house',
      id: 1,
    },
    {
      title: 'Contact',
      className: 'bi bi-envelope-fill',
      id: 2,
    },
    {
      title: 'Favourites',
      className: 'bi bi-heart',
      id: 3,
    },
    {
      title: 'Account',
      className: 'bi bi-person-circle',
      id: 4,
    },
  ];

  get iconBox(): IconBox[] {
    return this.iconsBox
  }

}

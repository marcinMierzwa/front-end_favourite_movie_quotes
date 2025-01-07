import { Injectable } from '@angular/core';
import { IconBox } from '../Components/bottom-navbar/model/icon-box.interface';

@Injectable({
  providedIn: 'root',
})
export class BottomNavbarService {
  private readonly iconsBox: IconBox[] = [
    {
      title: 'Favourites',
      className: 'bi bi-heart',
      id: 1,
    },
    {
      title: 'Account',
      className: 'bi bi-person-circle',
      id: 2,
    },
  ];

  get iconBox(): IconBox[] {
    return this.iconsBox
  }

}

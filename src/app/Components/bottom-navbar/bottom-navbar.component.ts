import { Component, inject, WritableSignal } from '@angular/core';
import { IconBox } from './model/icon-box.interface';
import { BottomNavbarService } from '../../Services/Bottom-Navbar/bottom-navbar.service';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent {

  private bottomNavbarService: BottomNavbarService = inject(BottomNavbarService);

  readonly iconsBox: IconBox[] = this.bottomNavbarService.iconBox;



}


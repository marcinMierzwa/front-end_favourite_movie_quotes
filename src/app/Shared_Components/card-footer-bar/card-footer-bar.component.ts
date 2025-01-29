import { Component } from '@angular/core';
import { CardIconsBarComponent } from '../card-icons-bar/card-icons-bar.component';

@Component({
  selector: 'app-card-footer-bar',
  standalone: true,
  imports: [CardIconsBarComponent],
  templateUrl: './card-footer-bar.component.html',
  styleUrl: './card-footer-bar.component.scss'
})
export class CardFooterBarComponent {

}

import { Component } from '@angular/core';
import { CardComponent } from "../../Shared_Components/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // cards = ['1','2','3','4','5','6']
  cards = ['1','2','3','4']
}

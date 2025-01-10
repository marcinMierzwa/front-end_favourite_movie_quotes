import { Component, inject } from '@angular/core';
import { CardComponent } from "../../Shared_Components/card/card.component";
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgClass, NgStyle ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public stateService: StateService = inject(StateService);

  // cards = ['1','2','3','4','5','6']
    // cards = ['1','2','3','4','5','6','7','8']

  cards = ['1','2','3','4']
}

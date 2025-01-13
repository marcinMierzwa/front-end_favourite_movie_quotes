import { Component, inject } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, NgClass ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public stateService: StateService = inject(StateService);

  backgroundImageUrl = '/assets/images/card/aragorn.jpg';

}

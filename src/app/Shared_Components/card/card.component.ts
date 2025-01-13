import { Component, inject, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, NgClass, MatTooltipModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  public stateService: StateService = inject(StateService);
  backgroundImageUrl = '/assets/images/card/aragorn.jpg';
}

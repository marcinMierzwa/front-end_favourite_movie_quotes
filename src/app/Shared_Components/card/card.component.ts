import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgStyle, MatTooltipModule, RouterLink ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  public stateService: StateService = inject(StateService);
  dialog = input.required<string>();
  movie = input.required<string>();
  character = input.required<string>();
  likes = input.required<string[]>();
  cardBackgroundImageUrl = input.required<string>();
}

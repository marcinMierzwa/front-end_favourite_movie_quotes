import { Component, inject, input, output, signal, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgStyle } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, MatTooltipModule, RouterLink, ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  stateService: StateService = inject(StateService);
  likes = input<string[]>();
  backgroundUrl = input<string>();
  public triggerApiCall = signal(false);


}

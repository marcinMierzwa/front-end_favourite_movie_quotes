import { Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TruncateTextPipe } from '../../CustomPipes/truncate-text.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgStyle, MatTooltipModule, RouterLink,TruncateTextPipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  stateService: StateService = inject(StateService);

  dialog = input.required<string>();
  movie = input.required<string>();
  character = input.required<string>();
  likes = input.required<string[]>();
  cardBackgroundImageUrl = input.required<string>();
  expandOutput = output<Event>();


}

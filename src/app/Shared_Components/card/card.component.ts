import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { MatTooltipModule} from '@angular/material/tooltip';
import { TruncateTextPipe } from '../../CustomPipes/truncate-text.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatTooltipModule, TruncateTextPipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  stateService: StateService = inject(StateService);
  likes = input<string[]>();
  backgroundUrl = input<string>();
  dialog = input<string>();
  wordsCounter = input<number | null>(null);
  public triggerApiCall = signal(false);


}

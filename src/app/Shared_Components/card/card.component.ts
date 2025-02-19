import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatTooltipModule, ],
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

import { Component, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StateService } from '../../Services/State/state.service';

@Component({
  selector: 'app-card-icons-bar',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './card-icons-bar.component.html',
  styleUrl: './card-icons-bar.component.scss'
})
export class CardIconsBarComponent {
  stateService: StateService = inject(StateService);
  public triggerApiCall = signal(false);

}

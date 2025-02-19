import { Component, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';

@Component({
  selector: 'app-card-icons-bar',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './card-icons-bar.component.html',
  styleUrl: './card-icons-bar.component.scss'
})
export class CardIconsBarComponent {
  public triggerApiCall = signal(false);
  tooltipPositionBelow = ToolTipPosition.BELOW;


}

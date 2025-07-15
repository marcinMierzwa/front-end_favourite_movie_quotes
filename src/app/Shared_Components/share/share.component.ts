import { Component, computed, inject, input, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { ToolTipShare } from '../../Models/tooltip/tooltip.config';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent {

  readonly isLoggedIn = input<boolean>(false);
  readonly tooltipPositionBelow = ToolTipPosition.BELOW;

  readonly sharedToolTipMessage: Signal<ToolTipShare> = computed(() =>
  {
    const isLoggedIn = this.isLoggedIn();
    return isLoggedIn ?  ToolTipShare.isLoggedInShare :  ToolTipShare.isNotLoggedInShare
  }
  )
}

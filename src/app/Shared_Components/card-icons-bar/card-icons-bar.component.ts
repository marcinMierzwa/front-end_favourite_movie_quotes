import { Component, effect, inject, input, output, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';


@Component({
  selector: 'app-card-icons-bar',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './card-icons-bar.component.html',
  styleUrl: './card-icons-bar.component.scss'
})
export class CardIconsBarComponent {
  public triggerApiCall = signal(false);
  tooltipPositionBelow = ToolTipPosition.BELOW;
  quoteId = input<string>();
  onAddFavouriteQuote = output<string>();
  likeCount = signal<number>(3000);
  tooltipFavouritesMessage = input<ToolTipFavourites>(ToolTipFavourites.isNotLoggedIn);
  isLoggedIn = input<boolean>(false);

onAddToFavClick(){
  const id = this.quoteId();
  if (id) {
    this.onAddFavouriteQuote.emit(id);
  }
}
}

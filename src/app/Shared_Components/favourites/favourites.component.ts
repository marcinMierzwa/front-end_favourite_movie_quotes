import { Component, computed, effect, inject, input, output, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {

// constructor() {
//   effect(()=> console.log('list',this.isFavourite(), this.isLoggedIn(), this.quoteId())
//   )
// }
  // inputs & outputs
  readonly quoteId = input<string | undefined>(undefined);
  readonly isLoggedIn = input<boolean>(false);
  readonly favouritesIds =  input.required<string[]>();

  onToggleFavourite = output<string>();


  readonly tooltipPositionBelow = ToolTipPosition.BELOW;

  public readonly isFavourite: Signal<boolean> = computed(() => {
    const id = this.quoteId(); 
    if (!id) {
      return false;
    }
    return this.favouritesIds().includes(id);
  });
  readonly favouriteIcon: Signal<string> = computed(() =>
    this.isFavourite() ? 'favorite' : 'favorite_border'
  );
  readonly favouriteToolTipMessage: Signal<ToolTipFavourites> = computed(() => {
    if (!this.isLoggedIn()) {
      return ToolTipFavourites.isNotLoggedIn;
    }
    return this.isFavourite()
      ? ToolTipFavourites.RemoveFromFavourites
      : ToolTipFavourites.AddToFavourites;
  });

onFavClick() {
    const id = this.quoteId();
    if (id) {
      this.onToggleFavourite.emit(id);
    }
  }}

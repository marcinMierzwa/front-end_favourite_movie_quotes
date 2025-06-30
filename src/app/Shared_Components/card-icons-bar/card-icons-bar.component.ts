import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipPosition } from '../../Models/tooltip-position.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';
import { FavouritesService } from '../../Services/Favoutites/favourites.service';

@Component({
  selector: 'app-card-icons-bar',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './card-icons-bar.component.html',
  styleUrl: './card-icons-bar.component.scss',
})
export class CardIconsBarComponent {
  private readonly favouritesService: FavouritesService =
    inject(FavouritesService);

  // constructor() {
  //   effect(() => {
  //     console.log('isFavourite:', this.isFavourite()),
  //       console.log(
  //         'quote id:',
  //         this.quoteId(),
  //         console.log('favourites ids', this.favouritesIds())
  //       );
  //   });
  // }

  // inputs & outputs
  readonly quoteId = input<string | undefined>(undefined);
  readonly isLoggedIn = input<boolean>(false);
  onToggleFavourite = output<string>();

  readonly tooltipPositionBelow = ToolTipPosition.BELOW;
  readonly favouritesIds = this.favouritesService.favouritesIds;

  public readonly isFavourite: Signal<boolean> = computed(() => {
    const id = this.quoteId(); 
    if (!id) {
      return false;
    }
    return this.favouritesService.favouritesIds().includes(id);
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

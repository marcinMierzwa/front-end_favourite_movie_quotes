import {
  Component,
  effect,
  inject,
  input,
  Signal,
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { catchError, finalize, of} from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';
import { CardIconsBarComponent } from "../../Shared_Components/card-icons-bar/card-icons-bar.component";
import { RouterLink } from '@angular/router';
import { StateService } from '../../Services/State/state.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShareComponent } from "../../Shared_Components/share/share.component";
import { FavouritesComponent } from "../../Shared_Components/favourites/favourites.component";
import { LikesComponent } from "../../Shared_Components/likes/likes.component";
import { FavouritesService } from '../../Services/Favoutites/favourites.service';
import { LikesService } from '../../Services/Likes/likes.service';
import { Quote } from '../../Models/quote.interface';


@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [CardComponent, CardIconsBarComponent, RouterLink, MatProgressSpinnerModule, ShareComponent, FavouritesComponent, LikesComponent],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss',
})
export class QuoteDetailComponent {

  constructor() {
    effect(() => {
      const quoteId = this.id();
      if (quoteId) {
        this.isLoading.set(true);
        this.apiService.getOneQuote(quoteId).pipe(
          catchError((error) => {
            console.error("error when downloading a quote", error);
            return of(null);
          }),
          finalize(() => this.isLoading.set(false))
        ).subscribe((quoteData: Quote | null ) => {
          this.stateService.currentQuote.set(quoteData);
        });
      }
    }, { allowSignalWrites: true });
  }

    // effect(() => console.log('detail', this.id(), this.quote()))
  
  private apiService: ApiService = inject(ApiService);
  private stateService: StateService = inject(StateService);
  private favouritesService: FavouritesService = inject(FavouritesService);
  private likesService: LikesService = inject(LikesService);
  
  readonly quote: Signal<Quote | null> = this.stateService.currentQuote;
  readonly isLoggedIn = this.stateService.isLoggedIn;
  readonly isLoading = this.stateService.isLoading;
  readonly favouriteIds = this.stateService.favouriteQuotesIds;

  id = input<string>('');

  toggleFavourite(quoteId: string): void {
    const isCurrentlyFavourite = this.favouritesService
      .favouritesIds()
      .includes(quoteId);

    if (isCurrentlyFavourite) {
      this.favouritesService.removeFavouriteQuote(quoteId);
    } else {
      this.favouritesService.addFavouriteQuote(quoteId);
    }
  }

  toggleLike(quoteId: string): void {
    this.likesService.toggleLike(quoteId);
  }
}

import { inject, Injectable } from '@angular/core';
import { LikeApiService } from './like.api.service';
import { StateService } from '../State/state.service';
import { catchError, of, tap } from 'rxjs';
import { NotificationService } from '../Toastr/notification.service';
import { Like } from './models/like.model';
import { Quote } from '../../Models/quote.interface';

@Injectable({ providedIn: 'root' })
export class LikesService {
  private readonly likeApiService: LikeApiService = inject(LikeApiService);
  private readonly stateService: StateService = inject(StateService);
  private readonly notificationService: NotificationService =
    inject(NotificationService);

  toggleLike(quoteId: string): void {
    // === OPTYMISTIC UPDATE QUOTES ===
    this.stateService.quotes.update((currentQuotes) => {
      return currentQuotes.map((quote) => {
        if (quote._id === quoteId) {
          return {
            ...quote,
            isLikedByUser: !quote.isLikedByUser,
            likeCount: quote.isLikedByUser
              ? quote.likeCount - 1
              : quote.likeCount + 1,
          };
        }
        return quote;
      });
    });

    this.stateService.currentQuote.update(currentQuote => {
      if (currentQuote && currentQuote._id === quoteId) {
        return this.updateQuoteState(currentQuote);
      }
      return currentQuote;
    });

    // === CALL API IN BACKGROUD ===
    this.likeApiService
      .toggleLike(quoteId)
      .pipe(
        tap((response: Like) => {
          this.stateService.quotes.update((currentQuotes) => {
            return currentQuotes.map((quote) => {
              if (quote._id === quoteId) {
                return { ...quote, likeCount: response.likeCount };
              } else {
                return quote;
              }
            });
          });
        }),
        catchError((error) => {
          console.error(
            'Sorry. Something went wrong, please try again .',
            error
          );

          this.stateService.quotes.update((currentQuotes) => {
            return currentQuotes.map((quote) => {
              if (quote._id === quoteId) {
                return {
                  ...quote,
                  isLikedByUser: !quote.isLikedByUser,
                  likeCount: quote.isLikedByUser
                    ? quote.likeCount - 1
                    : quote.likeCount + 1,
                };
              }
              return quote;
            });
          });

          return of(null);
        })
      )
      .subscribe();
  }
  
   private updateQuoteState(quote: Quote): Quote {
    return {
      ...quote,
      isLikedByUser: !quote.isLikedByUser,
      likeCount: quote.isLikedByUser ? quote.likeCount - 1 : quote.likeCount + 1,
    };
  }
}

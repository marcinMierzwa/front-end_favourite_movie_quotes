import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { StateService } from '../State/state.service';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';
import { FavouritesApiService } from './favourites.api.service';
import { catchError, of, tap } from 'rxjs';
import { AddFavouriteQuoteResponseModel } from './models/add-favourite-quote-response.model';
import { NotificationService } from '../Toastr/notification.service';
import { toastrConfigFavoutites } from '../../Config/toastr.config';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  constructor() {
    effect(
      () => {
        const isLoggedIn = this.isLoggedIn();
        if (isLoggedIn) {
          this.loadInitialFavourites();
        } else {
          this.favouritesIds.set([]);
        }
      },
      { allowSignalWrites: true }
    );
  }

  private readonly stateService: StateService = inject(StateService);
  private readonly notificationService: NotificationService =
    inject(NotificationService);
  private readonly favouritesApiService: FavouritesApiService =
    inject(FavouritesApiService);
  public tooltipMessage = signal<ToolTipFavourites>(
    ToolTipFavourites.isNotLoggedIn
  );
  private readonly isLoggedIn = this.stateService.isLoggedIn;

  public readonly favouritesIds: WritableSignal<string[]> = signal<string[]>(
    []
  );

  private loadInitialFavourites(): void {
    this.favouritesApiService
      .loadFavouriteQuotes()
      .pipe(
        catchError((err) => {
          console.error('Failed to fetch favourites:', err);
          return of([]);
        })
      )
      .subscribe((ids: string[]) => {
        this.favouritesIds.set(ids);
      });
  }

  addFavouriteQuote(id: string): void {
    this.favouritesIds.update((currentIds: string[]) => [...currentIds, id]);
    this.favouritesApiService
      .addFavouriteQuote(id)
      .pipe(
        tap((res: AddFavouriteQuoteResponseModel) => {
          const message = res.message;
          this.notificationService.showSuccess(
            message,
            '',
            toastrConfigFavoutites
          );
        }),
        catchError((err) => {
          console.error('Failed to add favourite:', err);
          this.favouritesIds.update((ids: string[]) =>
            ids.filter((favId) => favId !== id)
          );
          return of(null);
        })
      )
      .subscribe();
  }

  removeFavouriteQuote(id: string): void {
    this.favouritesIds.update((currentIds: string[]) =>
      currentIds.filter((favId) => favId !== id)
    );
    this.favouritesApiService
      .removeFavouriteQuote(id)
      .pipe(
        tap((res: AddFavouriteQuoteResponseModel) => {
          const message = res.message;
          this.notificationService.showInfo(
            message,
            '',
            toastrConfigFavoutites
          );
        }),

        catchError((err) => {
          console.error('Failed to add favourite:', err);
          this.favouritesIds.update((ids: string[]) =>
            ids.filter((favId) => favId !== id)
          );
          return of(null);
        })
      )
      .subscribe();
  }
}

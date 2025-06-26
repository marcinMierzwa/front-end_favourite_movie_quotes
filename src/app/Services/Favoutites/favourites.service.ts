import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { StateService } from '../State/state.service';
import { ToolTipFavourites } from '../../Models/tooltip/tooltip.config';
import { FavouritesApiService } from './favourites.api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
    // constructor() {
    //     effect(() => console.log(this.favouritesIds()))
    // }

  private stateService: StateService = inject(StateService);
  private favouritesApiService: FavouritesApiService =
    inject(FavouritesApiService);
  public tooltipMessage = signal<ToolTipFavourites>(
    ToolTipFavourites.isNotLoggedIn
  );
  private readonly isUserLoggedIn$ = toObservable(this.stateService.isLoggedIn);
  private favouritesIds$ = this.isUserLoggedIn$.pipe(
    switchMap((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return this.favouritesApiService.loadFavouriteQuotes().pipe(
          catchError((err) => {
            console.error('Failed to fetch favourites:', err);
            return of([]);
          })
        );
      } else {
        return of([]);
      }
    })
  );

  public readonly favouritesIds: Signal<string[]> = toSignal(this.favouritesIds$, {initialValue: []});
  
  // private setTooltipMessage(): ToolTipFavourites {
  //     const isLoggedIn = this.isLoggedIn();

  // }
}

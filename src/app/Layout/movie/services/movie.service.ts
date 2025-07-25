import { inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { StateService } from '../../../Services/State/state.service';
import { MovieApiService } from './movie.api.service';
import {
  catchError,
  distinctUntilChanged,
  EMPTY,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly stateService: StateService = inject(StateService);
  private readonly movieApiService: MovieApiService = inject(MovieApiService);

  public movie: WritableSignal<Movie | null> = this.stateService.movie;
  public isLoadingMovie: WritableSignal<boolean> =
    this.stateService.isLoadingMovie;
  public errorMovie: WritableSignal<any | null> = this.stateService.errorMovie;

  public getMovieById(movieId$: Observable<string>): void {
    movieId$
      .pipe(
        distinctUntilChanged(),
        switchMap((id) => {
          if (!id) {
            this.movie.set(null);
            return EMPTY;
          }

          this.isLoadingMovie.set(true);
          this.errorMovie.set(null);

          return this.movieApiService.getMovieById(id).pipe(
            tap((movieData) => {
              this.movie.set(movieData);
            }),
            catchError((error) => {
              this.errorMovie.set(error);
              return EMPTY;
            }),
            finalize(() => {
              this.isLoadingMovie.set(false);
            })
          );
        })
      )
      .subscribe();
  }
}

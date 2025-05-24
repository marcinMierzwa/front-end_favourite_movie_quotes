import { inject, Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { StateService } from '../State/state.service';
import { MovieNameDto } from '../Api/dto/movies-name.dto';
import { tap, finalize } from 'rxjs';
import { CharacterNameDto } from '../Api/dto/character-model-dto';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  apiService: ApiService = inject(ApiService);
  stateService: StateService = inject(StateService);
  authService: AuthService = inject(AuthService);

  initAppData(): void {
    this.getMovieNames();
    this.getCharacterNames();
  }

  getMovieNames(): void {
    this.stateService.isLoading.set(true);
    this.apiService
      .getMovieNames()
      .pipe(
        tap((movieNames: MovieNameDto[]) => {
          const sorted = [...movieNames].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.stateService.movieNames.set(sorted);
        }),
        finalize(() => this.stateService.isLoading.set(false))
      )
      .subscribe({
        error: (error) => console.error(error.error.message),
      });
  }

  getCharacterNames(): void {
    this.stateService.isLoading.set(true);
    this.apiService
      .getCharacterNames()
      .pipe(
        tap((characterNames: CharacterNameDto[]) => {
          const sorted = [...characterNames].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          this.stateService.characterNames.set(sorted)
        }),
        finalize(() => this.stateService.isLoading.set(false))
      )
      .subscribe({
        error: (error) => console.error(error.error.message),
      });
  }
}

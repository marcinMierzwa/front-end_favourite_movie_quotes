import { inject, Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { StateService } from '../State/state.service';
import { finalize, tap } from 'rxjs';
import { MovieModelDto } from '../Api/dto/movie-model-dto';
import { CharacterModelDto } from '../Api/dto/character-model-dto';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiService: ApiService = inject(ApiService);
  stateService: StateService = inject(StateService);

  getMovies(): void {
    this.stateService.isLoading.set(true);
    this.apiService
      .getMovies()
      .pipe(
        tap((movies: MovieModelDto[]) => this.stateService.movies.set(movies)),
        finalize(() => this.stateService.isLoading.set(false))
      )
      .subscribe({
        error: (error) => console.error(error.error.message),
      });
  }

  getCharacters(): void {
    this.stateService.isLoading.set(true);
    this.apiService
      .getCharacters()
      .pipe(
        tap((movies: CharacterModelDto[]) => this.stateService.characters.set(movies)),
        finalize(() => this.stateService.isLoading.set(false))
      )
      .subscribe({
        error: (error) => console.error(error.error.message),
      });
  }

}

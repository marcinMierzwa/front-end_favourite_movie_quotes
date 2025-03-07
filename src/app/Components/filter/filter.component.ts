import { Component, inject, signal, Signal } from '@angular/core';
import { SelectComponent } from '../../Shared_Components/select/select.component';
import { MovieName } from '../../Models/movie-name.interface';
import { CharacterName } from '../../Models/character-name.interface';
import { ApiService } from '../../Services/Api/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  private apiService: ApiService = inject(ApiService);
  readonly errorMessage = signal<string>('');

  readonly movieNames: Signal<MovieName[]> =
  toSignal(this.apiService.getMovieNames()
  .pipe(
    catchError((error) => {
      console.error('Error ocured:', error);
      this.errorMessage.set('Sorry, Error ocured, try again later');
      return of([]);
    })), {initialValue: []});

    readonly characterNames: Signal<CharacterName[]> =
    toSignal(this.apiService.getCharacterNames()
    .pipe(
      catchError((error) => {
        console.error('Error ocured:', error);
        this.errorMessage.set('Sorry, Error ocured, try again later');
        return of([]);
      })), {initialValue: []});

    readonly selectesHeading: string[] = ['Characters', 'Movies'];

}

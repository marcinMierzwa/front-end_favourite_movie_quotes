import { Component, inject, Signal, signal } from '@angular/core';
import { SelectComponent } from '../../Shared_Components/select/select.component';
import { CharacterNameModel } from '../../Models/character-name-model.';
import { StateService } from '../../Services/State/state.service';
import { MovieNameModel } from '../../Models/movie-name-model';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  private readonly stateService: StateService = inject(StateService);
  readonly errorMessage = signal<string>('');
  readonly selectesHeading: string[] = ['Characters', 'Movies'];
  readonly characterNames: Signal<CharacterNameModel[]> = this.stateService.characterNames;
  readonly movieNames: Signal<MovieNameModel[]> = this.stateService.movieNames;
}

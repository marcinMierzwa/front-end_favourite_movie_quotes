import { Component, inject, input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CharacterName } from '../../Models/character-name.interface';
import { MovieName } from '../../Models/movie-name.interface';
import { ApiService } from '../../Services/Api/api.service';
import { StateService } from '../../Services/State/state.service';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  private stateService: StateService = inject(StateService); 
  private apiService: ApiService = inject(ApiService); 
  

  readonly selectOptions = input.required<CharacterName[] | MovieName[]>();
  readonly selectHeading = input.required<string>();

  onSelectionChange(option: MatSelectChange, heading: string) {
    if (heading === 'Movies') {
      this.stateService.paginationState.update((state) => ({
        ...state,
        pageIndex: 0,
      }));
      this.stateService.filter.update(currentFilter => ({
        ...currentFilter,
        movie: option.value === '' ? undefined : option.value 
      }));
      this.apiService.getQuotes();
    } else if (heading === 'Characters') {
      this.stateService.paginationState.update((state) => ({
        ...state,
        pageIndex: 0,
      }));
      this.stateService.filter.update(currentFilter => ({
        ...currentFilter,
        character: option.value === '' ? undefined : option.value 
      }));
    } 
    this.apiService.getQuotes();

   }
  }

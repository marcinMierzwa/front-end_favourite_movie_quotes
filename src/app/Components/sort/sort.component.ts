import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../Services/State/state.service';
import { ApiService } from '../../Services/Api/api.service';


@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
private stateService: StateService = inject(StateService); 
private apiService: ApiService = inject(ApiService); 
private formBuilder:NonNullableFormBuilder = inject(NonNullableFormBuilder);
readonly  radioButtonsOptions = [
  { label: 'Asc', value: 'asc', id: 1 },
  { label: 'Desc', value: 'desc', id: 2 },
  { label: 'Most Likes', value: 'mostLikes', id: 3 },
  { label: 'Least Likes', value: 'leastLikes', id: 4 },
];


readonly buttonsForm: FormGroup = this.formBuilder.group({
  sortBy: ['asc'], 
});

onSubmit(): void {
  const sortValue = this.buttonsForm.value.sortBy;
  this.stateService.paginationState.update((state) => ({
    ...state,
    pageIndex: 0,
  }));
  this.stateService.sort.update(() => sortValue);
this.apiService.getQuotes();
}



}

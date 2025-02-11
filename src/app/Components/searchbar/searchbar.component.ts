import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent implements OnInit {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  isScrollMode = this.stateService.isScrollMode;

  searchInput: FormControl = this.formBuilder.control('', [
    Validators.minLength(3),
  ]);

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchPhrase) => {
        if (this.searchInput.valid) {
          this.stateService.pagination.update((state) => ({
            ...state,
            pageIndex: 0,
          }));
          this.stateService.filter.set({
            search: searchPhrase,
          });
          this.apiService.getQuotes().subscribe({
            error: (error) => {
              console.error('Error occured', error);
            },
          });
        }
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const searchValue = this.searchInput.getRawValue();
    if (this.searchInput.valid) {
      this.stateService.pagination.update((state) => ({
        ...state,
        pageIndex: 0,
      }));
      this.stateService.filter.set({
        search: searchValue,
      });
      this.apiService.getQuotes().subscribe({
        error: (error) => {
          console.error('Error occured', error);
        },
      });
    }
  }
}

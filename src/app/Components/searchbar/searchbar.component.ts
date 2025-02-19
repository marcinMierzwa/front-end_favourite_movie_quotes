import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';
import { QuoteResponseDto } from '../../Services/Api/dto/quote-response.dto';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent implements OnInit, OnDestroy {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  isMobileMode = this.stateService.isScrollMode;
  private destroy$ = new Subject<void>();

  searchInput: FormControl = this.formBuilder.control('', [
    Validators.minLength(3),
  ]);

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(),
      takeUntil(this.destroy$))
      .subscribe((searchPhrase) => {
        if (this.searchInput.valid) {
          this.stateService.paginationState.update((state) => ({
            ...state,
            pageIndex: 0,
          }));
          this.stateService.filter.set({
            search: searchPhrase,
          });
          this.apiService.getQuotes();
        }
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const searchValue = this.searchInput.getRawValue();
    if (this.searchInput.valid) {
      this.stateService.paginationState.update((state) => ({
        ...state,
        pageIndex: 0,
      }));
      this.stateService.filter.set({
        search: searchValue,
      });
      this.apiService.getQuotes();
    }
  }

  // loadQuotes(): void {
  //     this.apiService.getQuotes().subscribe({
  //       next: (response: QuoteResponseDto) => {
  //         this.stateService.quotes.set(response.data);
  //         this.stateService.pagination.update((state) => ({
  //           ...state,
  //           length: response.totalItems,
  //           pageIndex: response.pageIndex,
  //           pageSize: response.pageSize,
  //         }));
  //       },
  //       error: (error) => {
  //         console.error('Error occured during fetching quotes', error);
  //       },
  //     });
  //   }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

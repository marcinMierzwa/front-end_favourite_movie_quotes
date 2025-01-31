import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit{
  stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService); 
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  searchInput: FormControl = this.formBuilder.control('', [Validators.minLength(3)])

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500), 
        distinctUntilChanged() 
      )
      .subscribe((searchPhrase) => {
        if (this.searchInput.valid) { 
          this.stateService.filter.set({
            search: searchPhrase
          });
          this.apiService.getQuotes();
        }
      });

  
    
  }

  onSubmit() {
    if (this.searchInput.valid) {
      console.log('Szukam:', this.searchInput.value);
      // Wywołaj metodę szukania np. this.stateService.searchQuotes(this.searchInput.value);
    }
  }}

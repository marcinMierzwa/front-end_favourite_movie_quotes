import {
  computed,
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PaginationState } from '../../Models/pagination-state.interface';
import { FilterState } from '../../Models/filter-state.interface';
import { QueryParams } from '../../Models/query-params.interface';
import { UserModel } from '../../Models/user.model';
import { MovieNameModel } from '../../Models/movie-name-model';
import { CharacterNameModel } from '../../Models/character-name-model.';
import { Quote } from '../../Models/quote.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // constructor() {
  //   effect(() => console.log(this.quotes())
  //   )
  // }


  public isScrollMode: WritableSignal<boolean> = signal<boolean>(false);

  public isLoading: WritableSignal<boolean> = signal(false);

  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  public isLoggedIn: Signal<boolean> = computed(() => {
    return this.user() !== null; 
  });


  public quotes: WritableSignal<Quote[]> = signal<Quote[]>([]);
  
  public movieNames: WritableSignal<MovieNameModel[]> = signal<MovieNameModel[]>([]);

  public characterNames: WritableSignal<CharacterNameModel[]> = signal<CharacterNameModel[]>([]);


  public errorMessage: WritableSignal<string | null> = signal<string | null>(null);

  public  paginationState : WritableSignal<PaginationState> = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });


  //filter/search 
  public  filter: WritableSignal<FilterState> = signal<FilterState>({});
  public  sort: WritableSignal<string> = signal<string>('');


  public  queryParams = computed<QueryParams>(() => {
    const { pageIndex, pageSize } = this.paginationState();
    const filter = this.filter();
    const sort = this.sort();

    const params: QueryParams = {
        skip: pageIndex,
        limit: pageSize,
    };

    if (filter.search) {
        params.search = filter.search;
    }
    if (filter.movie) {
        params.movie = filter.movie;
    }
    if (filter.character) {
        params.character = filter.character;
    }
    if (sort) {
      params.sort = sort;
    }

    return params;
    });




}

import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { PaginationState } from '../../Models/pagination-state.interface';
import { FilterState } from '../../Models/filter-state.interface';
import { QueryParams } from '../../Models/query-params.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {


  public readonly isScrollMode: WritableSignal<boolean> =
  signal<boolean>(false);

  public isLoading: WritableSignal<boolean> = signal(false);

  public readonly paginationState : WritableSignal<PaginationState> = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });


  //filter/search 
  public readonly filter: WritableSignal<FilterState> = signal<FilterState>({});
  public readonly sort: WritableSignal<string> = signal<string>('');


  public readonly queryParams = computed<QueryParams>(() => {
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

  effFilter=effect(()=> { 
    // console.log(this.filter())
    // console.log(this.queryParams())
    // console.log(this.paginationState())
  })





}

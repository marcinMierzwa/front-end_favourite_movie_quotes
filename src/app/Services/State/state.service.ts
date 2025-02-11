import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';
import { TooltipPosition } from '@angular/material/tooltip';
import { Quote } from '../../Models/quote.interface';
import { PaginationState } from '../../Models/pagination-state.interface';
import { FilterState } from '../../Models/filter-state.interface';
import { QueryParams } from '../../Models/query-params.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // breakpoints modes
  // public readonly screenBreakpoint: WritableSignal<CustomBreakpoints> =
  //   signal<CustomBreakpoints>(CustomBreakpoints.XXL);

  public readonly isScrollMode: WritableSignal<boolean> =
    signal<boolean>(false);

  //quotes
  public readonly quotes = signal<Quote[]>([]);

  // pagination

  pagination: WritableSignal<PaginationState> = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
    length:0,
  });

  //filter/search 
  public readonly filter: WritableSignal<FilterState> = signal<FilterState>({});

  public readonly queryParams = computed<QueryParams>(() => {
    const { pageIndex, pageSize } = this.pagination();
    const filter = this.filter();

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
    return params;
    });

  effFilter=effect(()=> { 
    // console.log(this.filter())
    // console.log(this.queryParams())
    console.log(this.pagination())
  })

  // tooltip
  public readonly positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ];



}

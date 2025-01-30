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
  public readonly screenBreakpoint: WritableSignal<CustomBreakpoints> =
    signal<CustomBreakpoints>(CustomBreakpoints.XXL);

  public readonly isScrollMode: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly isMediumMode: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly isLargeMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isXlMode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isXxlMode: WritableSignal<boolean> = signal<boolean>(false);

  eff = effect(() => {
    // console.log('pagination', this.pagination());
  });


  //quotes
  readonly quotes = signal<Quote[]>([]);


  // pagination
  public pageSizeMobileOptions = signal([3]);
  public pageSizeMediumOptions = signal([2,3,4]);
  public pageSizeLargeOptions = signal([2,3,4]);
  public pageSizeXlOptions = signal([2,3,4,5,6]);

  public pageSizeOptions = computed(() => {
    if (this.isScrollMode()) {
      return this.pageSizeMobileOptions();
    }
    if (this.isMediumMode()) {
      return this.pageSizeMediumOptions();
    }
    if (this.isLargeMode()) {
      return this.pageSizeLargeOptions();
    }
    if (this.isXlMode() || this.isXxlMode()) {
      return this.pageSizeXlOptions();
    }
    return [];
  });

  public pagination: WritableSignal<PaginationState> = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
    length: 0,
  });

  //filter/search 
  public filter: WritableSignal<FilterState> = signal<FilterState>({});

  public queryParams = computed<QueryParams>(() => {
    const { pageIndex, pageSize } = this.pagination();
    const filter = this.filter();

    const params: QueryParams = {
        skip: pageIndex.toString(),
        limit: pageSize.toString(),
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
    console.log(this.filter())
    console.log(this.queryParams())

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

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
    console.log('pagination', this.pagination());
    console.log('isScroll', this.isScrollMode());
  });


  //quotes
  readonly quotes = signal<Quote[]>([]);


  // pagination
  public pageSizeMobileOptions = signal([4]);
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

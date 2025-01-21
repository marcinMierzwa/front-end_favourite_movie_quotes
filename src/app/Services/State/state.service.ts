import {
  computed,
  effect,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';
import { TooltipPosition } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';
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

  eff=effect(() => {
    console.log('pageSizeOption', this.pageSizeOptions())
  })


  public readonly headerMobileHeight: WritableSignal<number> =
    signal<number>(0);

  //quotes
  public quotesSubject = new BehaviorSubject<Quote[]>([]);
  public readonly quotes$ = this.quotesSubject.asObservable();

  // pagination
  public pageSizeOptionsMobile = signal([4]);
  public pageSizeOptionsMedium = signal([1, 2]);
  public pageSizeOptionsLarge = signal([2, 3]);
  public pageSizeOptionsXl = signal([2, 3, 4]);

  public pageSizeOptions = computed(() => {
    if (this.isScrollMode()) {
      return this.pageSizeOptionsMobile();
    }
    if (this.isMediumMode()) {
      return this.pageSizeOptionsMedium();
    }
    if (this.isLargeMode()) {
      return this.pageSizeOptionsLarge();
    }
    if (this.isXlMode() || this.isXxlMode()) {
      return this.pageSizeOptionsXl();
    }
    return []
  });

  readonly pageSizeInit = computed(() => {
    if (this.isScrollMode()) {
      return 4;
    }
    if (this.isMediumMode()) {
      return 2;
    }
    if (this.isLargeMode()) {
      return 3;
    }
    if (this.isXlMode() || this.isXxlMode()) {
      return 3;
    }
    return 0
  });



  public paginationSubject = new BehaviorSubject<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
    length: 0,
  });
  pagination$ = this.paginationSubject.asObservable();

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

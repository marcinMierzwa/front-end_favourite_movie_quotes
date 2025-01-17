import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';
import { TooltipPosition } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';
import { Quote } from '../../Models/quote.interface';
import { PaginationState } from '../../Models/pagination-state.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  
  public readonly screenBreakpoint: WritableSignal<CustomBreakpoints> =
    signal<CustomBreakpoints>(CustomBreakpoints.XXL);

  public readonly isScrollMode: WritableSignal<boolean> =
    signal<boolean>(false);
  

  public readonly headerMobileHeight: WritableSignal<number> =
    signal<number>(0);

  //quotes
  public quotesSubject = new BehaviorSubject<Quote[]>([]);
  public readonly quotes$ = this.quotesSubject.asObservable();

  // pagination
  public pageSizeOptions = signal ([2, 3, 4]);
  

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

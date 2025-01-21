import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { StateService } from '../../Services/State/state.service';
import { NgClass } from '@angular/common';
import { ApiService } from '../../Services/Api/api.service';
import { Quote } from '../../Models/quote.interface';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationState } from '../../Models/pagination-state.interface';
import { Breakpoints } from '@angular/cdk/layout';
import { CustomBreakpoints } from '../../Models/custom-breakpoint.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgClass, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class HomeComponent implements OnInit {
  public stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);

  readonly cardsBackgroundImageUrl: { [key: string]: string } = {
    'The Fellowship of the Ring': '/assets/images/card/The_Fellowship_Of_The_Ring.jpg',
    'The Two Towers': '/assets/images/card/The_Two_Towers.jpg',
    'The Return of the King': '/assets/images/card/The_Return_Of_The_King.jpg',
  };

  // quotes signal
  readonly quotes: Signal<Quote[]> = toSignal(this.stateService.quotes$, {
    initialValue: [],
  });
  readQuoteEff = effect(() => console.log(this.quotes()));
  // readQuoteEff2 = effect(() => console.log(this.currentPageSize()));
  // paginator
  readonly pagination: Signal<PaginationState> = toSignal(
    this.stateService.pagination$,
    {
      initialValue: {
        pageIndex: 0,
        pageSize: 0,
        length: 0,
      },
    }
  );

  // readonly currentPageSize = computed(() => {
  //   const paginationState = this.pagination(); // Odczyt z sygnału `pagination`
  //   const pageSizeInit = this.stateService.pageSizeInit(); // Odczyt z sygnału `pageSizeInit`
  
  //   // Jeśli `paginationState.pageSize` jest większe od 0, użyj wartości z `pagination`
  //   if (paginationState.pageSize > 0) {
  //     return paginationState.pageSize;
  //   }
  
  //   // W przeciwnym razie, użyj wartości z `pageSizeInit`
  //   return pageSizeInit;
  // });
  



  ngOnInit(): void {
    this.apiService.getQuotes(
      this.pagination().pageIndex,
      this.stateService.pageSizeInit(),
    );
  }

  handlePageEvent(pageEvent: PageEvent): void {

    this.stateService.paginationSubject.next({
      ...this.pagination(),
      pageIndex: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize,
    });
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.apiService.getQuotes(
      this.pagination().pageIndex,
      this.pagination().pageSize,
    );
  }  

    
    
  
}

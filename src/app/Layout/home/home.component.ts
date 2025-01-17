import {
  Component,
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

  // quotes signal
  readonly quotes: Signal<Quote[]> = toSignal(this.stateService.quotes$, {
    initialValue: [],
  });
  readQuoteEff = effect(() => console.log(this.quotes()));

  // paginator
  readonly pagination: Signal<PaginationState> = toSignal(
    this.stateService.pagination$,
    {
      initialValue: {
        pageIndex: 0,
        pageSize: 4,
        length: 0,
      },
    }
  );
  showPagEff = effect(() => {
    console.log('total items :', this.pagination());
  });

  pageSizeOptions = signal<number[]>([2,3])

  ngOnInit(): void {
    this.setPageSizeOptions()
    this.loadQuotes();
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
      this.pagination().pageSize
    );
  }

  setPageSizeOptions(): void {
    
  }
    
    
  
}

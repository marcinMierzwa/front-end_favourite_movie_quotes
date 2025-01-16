import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
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

  readonly quotes: WritableSignal<Quote[]> = signal<Quote[]>([]);
  readQuoteEff = effect(() => console.log(this.quotes()));

  // paginator
  public length = signal<number>(50);
  public pageIndex = signal<number>(1);
  public pageSize = signal<number>(4);
  public pageSizeOptions = signal<number[]>([2, 3, 4]);
  showPagEff = effect(() => {
    console.log('total items :', this.length());
    console.log('page index :', this.pageIndex());
    console.log('page size :', this.pageSize());
  });

  handlePageEvent(pageEvent: PageEvent): void {
    this.loadQuotes();
  }

  cards = ['1', '2', '3', '4'];

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.apiService.getQuotes(
      this.pageIndex(), this.pageSize()
    );
    this.stateService.quotes$.subscribe((quotes: Quote[]) =>
      this.quotes.set(quotes)
    );
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';
import { ApiService } from '../../Services/Api/api.service';
import { StateService } from '../../Services/State/state.service';
import { TruncateTextPipe } from '../../CustomPipes/truncate-text.pipe';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardIconsBarComponent } from '../../Shared_Components/card-icons-bar/card-icons-bar.component';
import { CardFooterBarComponent } from '../../Shared_Components/card-footer-bar/card-footer-bar.component';
import { QuoteResponseDto } from '../../Services/Api/dto/quote-response.dto';
import { Quote } from '../../Models/quote.interface';
import { Pagination } from '../../Models/pagination.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [
    CardComponent,
    MatPaginatorModule,
    TruncateTextPipe,
    RouterLink,
    MatTooltipModule,
    CardIconsBarComponent,
    CardFooterBarComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent  {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);

  public triggerApiCall = signal(false);
  readonly isScrollMode = this.stateService.isScrollMode;
  readonly isLoading = this.stateService.isLoading;

 readonly quotes: WritableSignal<Quote[]> = signal<Quote[]>([]);
 readonly pagination : WritableSignal<Pagination> = signal<Pagination>({
     pageIndex: 0,
     pageSize: 2,
     length:0,
   });
  
  readonly pageSizeOptions = [2, 3, 4];


  loadQuotes = effect(
    () => {
      this.stateService.isLoading.set(true);
  
      this.apiService.getQuotes().subscribe({
        next: (response: QuoteResponseDto) => {
  
          this.quotes.set(response.data);
          this.pagination.update((state) => ({
            ...state,
            length: response.totalItems,
            pageIndex: response.pageIndex,
            pageSize: response.pageSize,
          }));
  
        },
        error: (error) => {
          console.error("Error occurred during fetching quotes", error);
        },
        complete: () => {
          this.stateService.isLoading.set(false);
        },
      });
    },
    { allowSignalWrites: true }
  );   
  
  ngOnInit(): void {
    this.apiService.getQuotes()
    }


  handlePageEvent(pageEvent: PageEvent): void {
    this.stateService.paginationState.update((state) => ({
      ...state,
      pageIndex: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize,
    }));
    this.apiService.getQuotes()
    }

  getQuoteList(): string {
    if (this.isScrollMode()) {
      return 'w-100 overflow-auto d-flex flex-column flex-fill justify-content-evenly gap-3 p-2 border border-light border-opacity-50 rounded';
    } else {
      return 'w-100 d-flex flex-fill flex-wrap align-items-center justify-content-evenly gap-3 py-2';
    }
  }

  addToFavouriteQuotes(quoteId: string) {
    console.log(quoteId);
    
  }
}

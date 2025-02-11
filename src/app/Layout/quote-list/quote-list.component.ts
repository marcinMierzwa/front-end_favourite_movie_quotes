import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';
import { ApiService } from '../../Services/Api/api.service';
import { StateService } from '../../Services/State/state.service';
import { TruncateTextPipe } from '../../CustomPipes/truncate-text.pipe';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardIconsBarComponent } from "../../Shared_Components/card-icons-bar/card-icons-bar.component";
import { CardFooterBarComponent } from "../../Shared_Components/card-footer-bar/card-footer-bar.component";

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule, TruncateTextPipe, RouterLink, MatTooltipModule, CardIconsBarComponent, CardFooterBarComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteListComponent {
    private stateService: StateService = inject(StateService);
    private apiService: ApiService = inject(ApiService);

    public triggerApiCall = signal(false);
    readonly isScrollMode = this.stateService.isScrollMode;
    readonly quotes  = this.stateService.quotes;
    readonly pageSizeOptions = [2,3,4];
    readonly length = computed(() => this.stateService.pagination().length);
    readonly pageIndex = computed(() => this.stateService.pagination().pageIndex);
    readonly pageSize = computed(() => this.stateService.pagination().pageSize);

  
    ngOnInit(): void {
      this.apiService.getQuotes().subscribe({
        error: (error) => {
          console.error('Error occured', error);
        }
      });
    }
  
    handlePageEvent(pageEvent: PageEvent): void {
      this.stateService.pagination.update(state => ({
        ...state,
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize
      }));
      this.apiService.getQuotes().subscribe({
        error: (error) => {
          console.error('Error occured', error);
        }
      });
    }  

    getQuoteList(): string {
      if (this.isScrollMode()) {
        return "w-100 overflow-auto d-flex flex-column flex-fill justify-content-evenly gap-3 p-2 border border-light border-opacity-50 rounded"
      } else {
        return "d-flex flex-fill flex-wrap align-items-center justify-content-evenly gap-3 py-2"
      }
    }

  }
  
  


import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { NgClass } from '@angular/common';
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
  imports: [CardComponent, NgClass, MatPaginatorModule, TruncateTextPipe, RouterLink, MatTooltipModule, CardIconsBarComponent, CardFooterBarComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class QuoteListComponent {
    public stateService: StateService = inject(StateService);
    private apiService: ApiService = inject(ApiService);
      public triggerApiCall = signal(false);
    
  
    ngOnInit(): void {
      this.loadQuotes(
        this.stateService.pagination().pageIndex,
        this.stateService.pagination().pageSize,
      );
    }
  
    handlePageEvent(pageEvent: PageEvent): void {
  
     this.loadQuotes(pageEvent.pageIndex, pageEvent.pageSize)
  
    }
  
    loadQuotes(pageIndex: number, pageSize: number): void {
      this.apiService.getQuotes(
        pageIndex,
        pageSize,
      );
    }  
  
}

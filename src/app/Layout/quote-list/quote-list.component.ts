import { Component, inject } from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { NgClass } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';
import { ApiService } from '../../Services/Api/api.service';
import { StateService } from '../../Services/State/state.service';
import { TruncateTextPipe } from '../../CustomPipes/truncate-text.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CardComponent, NgClass, MatPaginatorModule, TruncateTextPipe, RouterLink],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})
export class QuoteListComponent {
    public stateService: StateService = inject(StateService);
    private apiService: ApiService = inject(ApiService);
    readonly cardsBackgroundImageUrl: { [key: string]: string } = {
      'The Fellowship of the Ring': '/assets/images/card/The_Fellowship_Of_The_Ring.jpg',
      'The Two Towers': '/assets/images/card/The_Two_Towers.jpg',
      'The Return of the King': '/assets/images/card/The_Return_Of_The_King.jpg',
    };
  
  
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

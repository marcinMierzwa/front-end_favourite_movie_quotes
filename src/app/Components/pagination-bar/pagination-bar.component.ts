import { Component } from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';


@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss',
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntl}]
})
export class PaginationBarComponent {
  currentPage = 0;

handlePageEvent(pageEvent : PageEvent): void {
  console.log('handlePageEvent', pageEvent);
  this.currentPage = pageEvent.pageIndex;
  
}

}

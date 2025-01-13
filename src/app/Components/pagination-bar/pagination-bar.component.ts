import { Component } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  currentPage = 0;

handlePageEvent(pageEvent : PageEvent): void {
  console.log('handlePageEvent', pageEvent);
  this.currentPage = pageEvent.pageIndex;
  
}

}

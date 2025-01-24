import {
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { StateService } from '../../Services/State/state.service';
import { NgClass, NgStyle } from '@angular/common';
import { ApiService } from '../../Services/Api/api.service';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntl } from '../../Services/Pagination/paginatorIntl.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgClass, NgStyle, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],

})
export class HomeComponent implements OnInit {
  public stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  public triggerApiCall = signal(false);

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

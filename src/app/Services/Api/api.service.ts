import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';

interface QuoteResponseDto {
  data: QuoteDataDto[];
  message: string;
  status: number;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
}
interface QuoteDataDto {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  movieId: string;
  characterId: string;
  likes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private stateService: StateService = inject(StateService);

  private readonly basicUrl_Dev = 'http://localhost:3001';

  getQuotes(pageIndex: number, pageSize: number): void {
    const params = new HttpParams()
      .set('skip', (pageIndex))
      .set('limit', pageSize);
    this.httpClient
      .get<QuoteResponseDto>(`${this.basicUrl_Dev}/quotes`, { params })
      .subscribe({
        next: (response: QuoteResponseDto) => {
          this.stateService.quotesSubject.next(response.data);
          this.stateService.paginationSubject.next({
            pageIndex: response.pageIndex,
            pageSize: response.pageSize,
            length: response.totalItems,
          });
        },
        error: (err) => {
          console.error('Error response:', err);
        },
      });
  }
}

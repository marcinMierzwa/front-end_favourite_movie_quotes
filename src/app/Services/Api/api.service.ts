import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { Observable } from 'rxjs';

interface QuoteResponseDto {
  data: QuoteDataDto[];
  message: string;
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
  backgroundUrl: string;
}

interface GetQuotesParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
  movie?: string;
  character?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private stateService: StateService = inject(StateService);

  private readonly basicUrl_Dev = 'http://localhost:3000';
  private readonly basicUrl_Prod = 'https://quotes-backend-nine.vercel.app/'

  getQuotes(): void {
    
    const { skip, limit, search } = this.stateService.queryParams();
    console.log(skip, limit, search);

      let httpParams = new HttpParams();
  
      httpParams = httpParams.set('skip', skip.toString());
      httpParams = httpParams.set('limit', limit.toString());
  
      if (search) {
          httpParams = httpParams.set('search', search);
      }
      // if (params.movie) {
      //     httpParams = httpParams.set('movie', params.movie);
      // }
      // if (params.character) {
      //     httpParams = httpParams.set('character', params.character);
      // }
      this.httpClient
        .get<QuoteResponseDto>(`${this.basicUrl_Prod}/quotes`, { params: httpParams })
        .subscribe({
          next: (response: QuoteResponseDto) => {
            this.stateService.quotes.set(response.data);
            this.stateService.pagination.set({
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
  

  getOne(id: string): Observable<QuoteDataDto> {
    return this.httpClient.get<QuoteDataDto>(
      `${this.basicUrl_Dev}/quotes/${id}`
    );
  }
}

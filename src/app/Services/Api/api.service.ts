import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { Observable, tap } from 'rxjs';

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

  // private apiUrl = environment.apiUrl

  private readonly basicUrl_Dev = 'http://localhost:3000';
  private readonly basicUrl_Prod = 'https://quotes-backend-nine.vercel.app';

  getQuotes() {
    
    const { skip, limit, search } = this.stateService.queryParams();
    console.log(skip, limit, search);

      let httpParams = new HttpParams();
  
      httpParams = httpParams.set('skip', skip);
      httpParams = httpParams.set('limit', limit);
  
      if (search) {
          httpParams = httpParams.set('search', search);
      }
      // if (params.movie) {
      //     httpParams = httpParams.set('movie', params.movie);
      // }
      // if (params.character) {
      //     httpParams = httpParams.set('character', params.character);
      // }
      return this.httpClient
        .get<QuoteResponseDto>(`${this.basicUrl_Prod}/quotes`, { params: httpParams })
        .pipe(
          tap((response: QuoteResponseDto) => {
        //quotes    
            this.stateService.quotes.update(() => response.data);

        //paginacja
        this.stateService.pagination.update(state => ({
          ...state,
          length: response.totalItems,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize
        }));
      })
    );
  }
  
  

  getOne(id: string): Observable<QuoteDataDto> {
    return this.httpClient.get<QuoteDataDto>(
      `${this.basicUrl_Prod}/quotes/${id}`
    );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { QuoteResponseDataDto } from './dto/quote-response-data.dto';
import { MovieNamesDto } from './dto/movies-names.dto';
import { MovieName } from '../../Models/movie-name.interface';

import { CharacterName } from '../../Models/character-name.interface';
import { CharacterNamesDto } from './dto/character-names.dto';
import { Quote } from '../../Models/quote.interface';




// interface GetQuotesParams {
//   pageIndex?: number;
//   pageSize?: number;
//   search?: string;
//   movie?: string;
//   character?: string;
// }

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private stateService: StateService = inject(StateService);

  // private apiUrl = environment.apiUrl

  private readonly basicUrl_Dev = 'http://localhost:3000';
  private readonly basicUrl_Prod = 'https://quotes-backend-nine.vercel.app';

  getQuotes(): Observable<QuoteResponseDto> {
    
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
          catchError((error) => {
            console.error('API Error:', error);
            return throwError(() => new Error('Error occurred during fetching quotes'));
          })
        );
  }
  
  

  getOneQuote(id: string): Observable<QuoteResponseDataDto> {
    return this.httpClient.get<QuoteResponseDataDto>(
      `${this.basicUrl_Prod}/quotes/${id}`)
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching quote'));
        })
      )
  }

  // filter
  getMovieNames(): Observable<MovieName[]> {
    return this.httpClient.get<MovieNamesDto>(`${this.basicUrl_Prod}/movies`)
      .pipe(
        map((response: MovieNamesDto) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching movie names'));
        })
      );
      
  }

    getCharacterNames(): Observable<CharacterName[]> {
    return this.httpClient.get<CharacterNamesDto>(`${this.basicUrl_Prod}/characters`)
      .pipe(
        map((response: CharacterNamesDto) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching character names'));
        })
      )
  }
}

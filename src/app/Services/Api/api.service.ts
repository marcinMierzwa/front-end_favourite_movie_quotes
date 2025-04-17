import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { QuoteResponseDataDto } from './dto/quote-response-data.dto';
import { MovieNamesDto } from './dto/movies-names.dto';
import { MovieName } from '../../Models/movie-name.interface';

import { CharacterName } from '../../Models/character-name.interface';
import { CharacterNamesDto } from './dto/character-names.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignUpUserModel } from '../Auth/Models/signupUserModel.interface';




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
    const { skip, limit, search, movie, character, sort} = this.stateService.queryParams();
      let httpParams = new HttpParams();
      httpParams = httpParams.set('skip', skip);
      httpParams = httpParams.set('limit', limit);
      if (search) {
          httpParams = httpParams.set('search', search);
      }
      if (movie) {
          httpParams = httpParams.set('movie', movie);
      }
      if (character) {
          httpParams = httpParams.set('character', character);
      }
      if (sort) {
        httpParams = httpParams.set('sort', sort);
    }
      return this.httpClient
        .get<QuoteResponseDto>(`${this.basicUrl_Dev}/quotes`, { params: httpParams })
        .pipe(
          catchError((error) => {
            console.error('API Error:', error);
            return throwError(() => new Error('Error occurred during fetching quotes'));
          })
        );
  }
  
  

  getOneQuote(id: string): Observable<QuoteResponseDataDto> {
    return this.httpClient.get<QuoteResponseDataDto>(
      `${this.basicUrl_Dev}/quotes/${id}`)
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching quote'));
        })
      )
  }

  // filter
  getMovieNames(): Observable<MovieName[]> {
    return this.httpClient.get<MovieNamesDto>(`${this.basicUrl_Dev}/movies`)
      .pipe(
        map((response: MovieNamesDto) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching movie names'));
        })
      );
      
  }

    getCharacterNames(): Observable<CharacterName[]> {
    return this.httpClient.get<CharacterNamesDto>(`${this.basicUrl_Dev}/characters`)
      .pipe(
        map((response: CharacterNamesDto) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching character names'));
        })
      )
  }

  // SignUp

  createUser(user: SignUpUserModel): Observable<SignUpUserDto> {
    return this.httpClient.post<SignUpUserDto>(`${this.basicUrl_Dev}/auth/signup`, user);
  }
}

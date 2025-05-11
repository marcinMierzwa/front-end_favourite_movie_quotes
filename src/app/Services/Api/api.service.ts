import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { QuoteResponseDataDto } from './dto/quote-response-data.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignUpUserModel } from '../Auth/Models/signup-user-model.interface';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginUserModel } from '../Auth/Models/login-user-model.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { UserDto } from './dto/user.dto';
import { MovieModelDto } from './dto/movie-model-dto';
import { CharacterModelDto } from './dto/character-model-dto';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private stateService: StateService = inject(StateService);

  private readonly basicUrl= 'http://localhost:3000';
  // private readonly basicUrl = 'https://quotes-backend-nine.vercel.app';

  // Get Data
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
        .get<QuoteResponseDto>(`${this.basicUrl}/quotes`, { params: httpParams })
        .pipe(
          catchError((error) => {
            console.error('API Error:', error);
            return throwError(() => new Error('Error occurred during fetching quotes'));
          })
        );
  }
  
  getOneQuote(id: string): Observable<QuoteResponseDataDto> {
    return this.httpClient.get<QuoteResponseDataDto>(
      `${this.basicUrl}/quotes/${id}`)
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => new Error('Error occurred during fetching quote'));
        })
      )
  }

  getMovies(): Observable<MovieModelDto[]> {
    return this.httpClient.get<MovieModelDto[]>(`${this.basicUrl}/movies`);
  }

  getCharacters(): Observable<CharacterModelDto[]> {
    return this.httpClient.get<CharacterModelDto[]>(`${this.basicUrl}/characters`)
  }

  getUser(): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.basicUrl}/users`)
  }

  // SignUp
  createUser(user: SignUpUserModel): Observable<SignUpUserDto> {
    return this.httpClient.post<SignUpUserDto>(`${this.basicUrl}/auth/signup`, user);
  }

  // Verify Email Address
  verifyEmailAddress(token: string): Observable<VerifyEmailDto> {
    return this.httpClient.post<VerifyEmailDto>(`${this.basicUrl}/auth/verify`, {token});
}

  // Resend Verification Email
  resendVerification(email: string): Observable<ResendVerificationDto> {
    return this.httpClient.post<ResendVerificationDto>(`${this.basicUrl}/auth/resend-verification`, {email});
  }

  // Login 
  login(credentials: LoginUserModel): Observable<LoginUserDto> {
    return this.httpClient.post<LoginUserDto>(`${this.basicUrl}/auth/login`, credentials);
  }

}

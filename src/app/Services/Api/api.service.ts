import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from '../State/state.service';
import { catchError, Observable, throwError } from 'rxjs';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { QuoteResponseDataDto } from './dto/quote-response-data.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignUpUserModel } from '../Auth/Models/signup-user-model.interface';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginUserModel } from '../Auth/Models/login-user-model.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { UserDto } from './dto/user.dto';
import { MovieNameDto } from './dto/movies-name.dto';
import { CharacterNameDto } from './dto/character-model-dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private stateService: StateService = inject(StateService);

  private readonly basicUrl= environment.apiUrl;
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

  getMovieNames(): Observable<MovieNameDto[]> {
    return this.httpClient.get<MovieNameDto[]>(`${this.basicUrl}/movies/movie-name`);
  }

  getCharacterNames(): Observable<CharacterNameDto[]> {
    return this.httpClient.get<CharacterNameDto[]>(`${this.basicUrl}/characters/character-name`)
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
    return this.httpClient.post<LoginUserDto>(`${this.basicUrl}/auth/login`, credentials, {
      withCredentials: true
    });
  }

  // login google
  googleLogin(): void {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }

  // Refresh Token
  refreshToken(): Observable<RefreshDto> {
    return this.httpClient.post<RefreshDto>(`${this.basicUrl}/auth/refresh`, {}, {
      withCredentials: true
    });
  }

  // Logout
  logout(): Observable<LogoutDto> {
    return this.httpClient.post<LogoutDto>(`${this.basicUrl}/auth/logout`, {}, {
      withCredentials: true
    });
  }

}

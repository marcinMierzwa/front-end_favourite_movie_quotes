import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../../../environments/environment';
import { MovieDataResponse } from '../models/movie.model.response.dto';

@Injectable({ providedIn: 'root' })
export class MovieApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly basicUrl = environment.apiUrl;

  getMovieById(movieId: string): Observable<Movie> {
    return this.httpClient
      .get<MovieDataResponse>(`${this.basicUrl}/movies/${movieId}`)
      .pipe(map((response: MovieDataResponse) => response.data));
  }
}

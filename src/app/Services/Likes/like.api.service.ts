import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Like } from './models/like.model';
import { LikeResponseDto } from './models/like.response.dto';

@Injectable({ providedIn: 'root' })
export class LikeApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/likes/toggle`;

  toggleLike(id: string): Observable<Like> {
    const body = { quoteId: id };
    return this.httpClient.post<LikeResponseDto>(this.endpoint, body);
  }
}

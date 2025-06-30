import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddFavouriteQuoteResponseModel } from './models/add-favourite-quote-response.model';
import { RemoveFavouriteQuoteResponseModel } from './models/remove-favourite-quote-response.model';

@Injectable({ providedIn: 'root' })
export class FavouritesApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/favourites`;

  loadFavouriteQuotes(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.endpoint);
  }

  addFavouriteQuote(id: string): Observable<AddFavouriteQuoteResponseModel> {
    const body = { quoteId: id };
    return this.httpClient.post<AddFavouriteQuoteResponseModel>(`${this.endpoint}/add`, body);
  }

  removeFavouriteQuote(id: string): Observable<RemoveFavouriteQuoteResponseModel> {
    const body = { quoteId: id };
    return this.httpClient.post<RemoveFavouriteQuoteResponseModel>(`${this.endpoint}/remove`, body);
  }
}

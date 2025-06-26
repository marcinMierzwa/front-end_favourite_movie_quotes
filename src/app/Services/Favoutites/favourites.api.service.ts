import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class FavouritesApiService {
    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly endpoint = `${environment.apiUrl}/favourites`;    
    body = {quoteId: '6797b6cf0e8b44ca2b27f7e4'}

    loadFavouriteQuotes(): Observable<string[]> {
       return this.httpClient.get<string[]>(this.endpoint);
    }
    addFavouriteQuote(): Observable<string[]> {
       return this.httpClient.post<string[]>(`${this.endpoint}/add`, this.body);
    }
}
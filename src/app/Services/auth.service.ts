import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginRequestInterface } from "../Models/login-request.interface";
import { Observable } from "rxjs";
import { LoginResponseInterface } from "../Models/login-response.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private httpClient: HttpClient = inject(HttpClient);

    login (payload: LoginRequestInterface): Observable<LoginResponseInterface> {
        return this.httpClient.post<LoginResponseInterface>('http://localhost:3000/auth', payload)
    }
}
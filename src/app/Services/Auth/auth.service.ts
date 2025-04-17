import { inject, Injectable } from "@angular/core";
import { ApiService } from "../Api/api.service";
import { SignUpUserModel } from "./Models/signupUserModel.interface";
import { SignUpUserDto } from "../Api/dto/signup-user.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiService: ApiService = inject(ApiService);

    createUser(user: SignUpUserModel) {
        this.apiService.createUser(user)
        .subscribe({
            next: ((response: SignUpUserDto) => {

            }),
            error: ((err) => console.error('Sorry! the account has not been created:', err.error.message))
        })
    }
}


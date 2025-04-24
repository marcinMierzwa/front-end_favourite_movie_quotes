import { inject, Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { SignUpUserModel } from './Models/signupUserModel.interface';
import { SignUpUserDto } from '../Api/dto/signup-user.dto';
import { StateService } from '../State/state.service';
import { NotificationService } from '../Toastr/notification.service';
import { toastrConfigSignUp } from '../../Config/toastr.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private notificationService: NotificationService = inject(NotificationService);
  private router: Router = inject(Router);

  createUser(user: SignUpUserModel) {
    this.apiService.createUser(user).subscribe({
      next: (response: SignUpUserDto) => {
        this.clearError();
        this.notificationService.showSuccess(response.message, 'success!', toastrConfigSignUp );
        this.router.navigateByUrl('/login');

      },
      error: (err) => {
        this.setError(err.error.message);
        console.error('error', err.error.message);
      },
    });
  }

  setError(msg: string) {
    this.stateService.errorMessage.set(msg);
  }

  clearError() {
    this.stateService.errorMessage.set(null);
  }
}

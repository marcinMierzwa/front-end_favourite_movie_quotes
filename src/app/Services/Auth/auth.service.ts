import { inject, Injectable } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { SignUpUserModel } from './Models/signupUserModel.interface';
import { SignUpUserDto } from '../Api/dto/signup-user.dto';
import { StateService } from '../State/state.service';
import { NotificationService } from '../Toastr/notification.service';
import {
  toastrConfigSignUp,
  toastrConfigVerify,
} from '../../Config/toastr.config';
import { Router } from '@angular/router';
import { VerifyEmailDto } from '../Api/dto/verify-email.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private router: Router = inject(Router);

  createUser(user: SignUpUserModel): void {
    this.stateService.isLoading.set(true);
    this.apiService.createUser(user).subscribe({
      next: (response: SignUpUserDto) => {
        this.clearError();
        this.notificationService.showSuccess(
          response.message,
          'Success!',
          toastrConfigSignUp
        );
      },
      error: (err) => {
        this.setError(err.error.message);
        console.error('error', err.error.message);
        this.stateService.isLoading.set(false);
      },
      complete: () => {
        this.stateService.isLoading.set(false);
      },
    });
  }

  verifyEmailAddress(token: string): void {
    this.stateService.isLoading.set(true);
    this.apiService.verifyEmailAddress(token).subscribe({
      next: (response: VerifyEmailDto) => {
        this.router.navigateByUrl('/login');
        setTimeout(() => {
          this.notificationService.showSuccess(
            response.message,
            'Success!',
            toastrConfigVerify
          );
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.router.navigateByUrl('/sign-up');
        setTimeout(() => {
          this.notificationService.showError(
            err.error.message,
            'UUUps!',
            toastrConfigSignUp
          );
        }, 1000);

        this.stateService.isLoading.set(false);
      },
      complete: () => {
        this.stateService.isLoading.set(false);
      },
    });
  }

  setError(msg: string): void {
    this.stateService.errorMessage.set(msg);
  }

  clearError(): void {
    this.stateService.errorMessage.set(null);
  }
}

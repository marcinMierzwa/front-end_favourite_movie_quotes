import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { SignUpUserModel } from './Models/signup-user-model.interface';
import { SignUpUserDto } from '../Api/dto/signup-user.dto';
import { StateService } from '../State/state.service';
import { NotificationService } from '../Toastr/notification.service';
import {
  toastrConfigDefault,
  toastrConfigDisableTimeOut,
  toastrConfigVerify,
} from '../../Config/toastr.config';
import { Router } from '@angular/router';
import { VerifyEmailDto } from '../Api/dto/verify-email.dto';
import { LoginUserModel } from './Models/login-user-model.interface';
import { LoginUserDto } from '../Api/dto/login-user.dto';
import { ResendVerificationDto } from '../Api/dto/resend-verification.dto';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';
import { UserDto } from '../Api/dto/user.dto';
import { UserModel } from '../../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private router: Router = inject(Router);
  // accessTokenSubject = new BehaviorSubject<string | null>(null);
  // public accessToken$ = this.accessTokenSubject.asObservable();
  accessToken = signal<string>('');

  createUser(user: SignUpUserModel): void {
    this.stateService.isLoading.set(true);
    this.apiService.createUser(user).subscribe({
      next: (response: SignUpUserDto) => {
        this.clearError();
        this.notificationService.showSuccess(
          response.message,
          'Success!',
          toastrConfigDisableTimeOut
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
            toastrConfigDisableTimeOut
          );
        }, 1000);

        this.stateService.isLoading.set(false);
      },
      complete: () => {
        this.stateService.isLoading.set(false);
      },
    });
  }

  resendVerification(email: string): void {
    this.stateService.isLoading.set(true);
    this.apiService.resendVerification(email).subscribe({
      next: (response: ResendVerificationDto) => {
        this.router.navigateByUrl('/login');
        setTimeout(() => {
          this.notificationService.showSuccess(
            response.message,
            'Success!',
            toastrConfigDisableTimeOut
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
            toastrConfigDisableTimeOut
          );
        }, 1000);

        this.stateService.isLoading.set(false);
      },
      complete: () => {
        this.stateService.isLoading.set(false);
      },
    });
  }

  login(credentials: LoginUserModel): void {
    this.stateService.isLoading.set(true);
  
    this.apiService.login(credentials).pipe(
      tap((res: LoginUserDto) => this.accessToken.set(res.accessToken)),
      switchMap(() => this.apiService.getUser()),
      tap(({ id, email, role, message }) => {
        this.notificationService.showSuccess(message, 'Success!', toastrConfigDefault);
        this.loginSetUser({ id, email, role });
        this.router.navigate(['home']);
        this.clearError();
      }),
      finalize(() => this.stateService.isLoading.set(false))
    ).subscribe({
      error: (err) => {
        const message = err.error?.message;
        const code = err.error?.code;
  
        if (code === 'EMAIL_NOT_VERIFIED') {
          const toast = this.notificationService.showInfo(
            `${message} <a href="#" class="resend-link">Resend Email Verification</a>`,
            'Email is not veryfied',
            toastrConfigDisableTimeOut
          );
  
          toast.onShown.subscribe(() => {
            const link = document.querySelector('.resend-link');
            if (link) {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                this.resendVerification(credentials.email);
              });
            }
          });
        } else {
          this.setError(message);
        }
      }
    });
  }

  loginSetUser(user: UserModel): void {
    this.stateService.user.set(user);

  }  // utils methods
  setError(msg: string): void {
    this.stateService.errorMessage.set(msg);
  }

  clearError(): void {
    this.stateService.errorMessage.set(null);
  }
}

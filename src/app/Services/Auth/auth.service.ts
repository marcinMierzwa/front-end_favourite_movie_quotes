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
import { catchError, finalize, map, mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { UserModel } from '../../Models/user.model';
import { UserDto } from '../Api/dto/user.dto';
import { RefreshDto } from '../Api/dto/refresh.dto';
import { LogoutDto } from '../Api/dto/logout.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private stateService: StateService = inject(StateService);
  private apiService: ApiService = inject(ApiService);
  private notificationService: NotificationService =
    inject(NotificationService);
  private router: Router = inject(Router);
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

    this.apiService
      .login(credentials)
      .pipe(
        mergeMap((res: LoginUserDto) => {
          this.accessToken.set(res.accessToken);
          return this.apiService.getUser().pipe(
            tap(({ id, email, role }) => {
              this.router.navigate(['home']);
              setTimeout(() => {
                this.notificationService.showSuccess(
                  res.message,
                  'Success!',
                  toastrConfigDefault
                );
              }, 1000);
              this.loginSetUser({ id, email, role });
              this.clearError();
            })
          );
        }),
        finalize(() => this.stateService.isLoading.set(false))
      )
      .subscribe({
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
        },
      });
  }

  loginSetUser(user: UserModel | null): void {
    this.stateService.user.set(user);
  }

tryRefreshSessionAndLoadUser(options?: { silent?: boolean; caller?: string }): Observable<UserDto | null> {
  if (!options?.silent) {
    this.stateService.isLoading.set(true);
  }

  return this.apiService.refreshToken().pipe( 
    tap((res: RefreshDto) => {
        this.accessToken.set(res.accessToken);
      }),
      switchMap(() => this.apiService.getUser()), 
      tap((user: UserDto) => {
        this.loginSetUser(user); 
      }),
      catchError((err) => {
        const errorMessage = err.error?.message || err.message;
        console.warn('AuthService: Session refresh or user load failed:', errorMessage);
        this.clearUserSession(); 
        return throwError(() => new Error(errorMessage)); 
      }),
    );
  }


  logout(): void {
    this.clearUserSession();
    this.apiService.logout().subscribe({
      error: ((err) => console.warn(err.error.message))
    });
    this.notificationService.showInfo('You have been logged out.', 'Logged Out', toastrConfigDefault);
  }


  // utils methods
   private clearUserSession(): void {
    this.accessToken.set('');
    this.loginSetUser(null);
  }

  private setError(msg: string): void {
    this.stateService.errorMessage.set(msg);
  }

  private clearError(): void {
    this.stateService.errorMessage.set(null);
  }
}
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  throwError,
  filter,
  take,
  tap,
} from 'rxjs';
import { AuthService } from '../Services/Auth/auth.service';
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  if (!authService) {
    return next(req);
  }
  const currentToken = authService.accessToken();
  let clonedReq = req;
  if (currentToken && !req.url.includes('/auth/refresh')) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
  }
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !clonedReq.url.includes('/auth/refresh')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.tryRefreshSessionAndLoadUser().pipe(
            switchMap(() => {
              const newAccessToken = authService.accessToken();
              isRefreshing = false;
              refreshTokenSubject.next(newAccessToken);
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                })
              );
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter((token) => {
              return token !== null;
            }),
            take(1),
            switchMap((jwtToken) => {
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                })
              );
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
}

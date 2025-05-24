// src/app/core/initializers/app-initializer.factory.ts

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../Services/Auth/auth.service';

export function initializeAuthFactory(authService: AuthService): () => Observable<any> {
  return () => {
    return authService.tryRefreshSessionAndLoadUser().pipe(
      catchError(error => {
        return of(null); 
      })
    );
  };
}


import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { toastrConfigDefault } from './Config/toastr.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
    routes,
    withViewTransitions(),
    withComponentInputBinding()),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot(toastrConfigDefault)
    ),
    provideHttpClient(),
    
  ]
};

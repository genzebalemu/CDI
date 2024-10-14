import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule } from '@angular/forms'; // Import FormsModule


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    NgxIntlTelInputModule,
    provideHttpClient(),
    provideOAuthClient(),
    FormsModule // Add FormsModule to the providers
  ]
};

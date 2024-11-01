import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../enviroments/enviroment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RecaptchaModule,ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY,RECAPTCHA_SETTINGS } from "ng-recaptcha";
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    provideClientHydration(),
    provideOAuthClient(),
    provideHttpClient(withFetch()), 
    NgxIntlTelInputModule,
    InputTextModule,
    InputOtpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    provideAnimations(),
    RecaptchaModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment. recaptcha },
  ]
};

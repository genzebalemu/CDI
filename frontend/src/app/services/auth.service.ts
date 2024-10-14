import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private OAtuhServices = inject(OAuthService)
private router = inject(Router)
  constructor() { }
}

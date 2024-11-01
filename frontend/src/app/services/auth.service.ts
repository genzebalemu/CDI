
import { Injectable, inject } from '@angular/core';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   auth = inject(Auth);
   http = inject(HttpClient);
   basicURL = 'https://64.23.233.117:7000/v1/api';
   url = '/student';

   registerStudent(studentData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });
    
    return this.http.post(`${this.basicURL}${this.url}`, studentData, { headers });
  }
  
  loginStudent(phoneNumber:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
   
    return this.http.post(`${this.basicURL}${this.url}`, phoneNumber, { headers })
  }
}


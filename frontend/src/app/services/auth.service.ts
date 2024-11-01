
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



   registerStudent(studentData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(`${this.basicURL}${this.registerurl}`, studentData, { headers });
  }
  
  loginStudent(uuid:string, token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    });
   
    const payload = { uuid: uuid };
    return this.http.post(`${this.basicURL}${this.loginurl}`,payload, { headers })
  }
}


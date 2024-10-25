import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Correct import for Angular Router
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://cdiwork.com:8082/v1/api';


  constructor(private http: HttpClient, private router: Router) { } // Constructor injection

  checkUserExist(uuidOrPhone: string): Observable<any> {
    const endpoint = '/user/check_user';
    const payload = { uuid: uuidOrPhone };
    return this.http.post(`${this.baseUrl}${endpoint}`, payload);
  }

  CreateStudent(): Observable<any> {
    const url:string = '/student'
    const payload = {
      "uuid": "",
      "city": "Addis Ababa",
      "country": "Ethiopia",
      "gender": "Male",
      "full_name": "Desta Meles",
      "phone": "+2519568394563",
      "email": "youremail@gmail.com"
  }
  return this.http.post(`${this.baseUrl}${url}`, payload)
}
  }



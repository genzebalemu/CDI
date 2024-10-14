import { Component } from '@angular/core';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html'
})
export class LoginComponent {
 basicURL:string= 'https://cdiwork.com:8082/v1/api'

}

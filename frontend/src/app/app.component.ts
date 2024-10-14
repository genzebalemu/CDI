import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterStudentComponent } from './pages/auth/register-student/register-student.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, LoginComponent, RegisterStudentComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'CDI';
}

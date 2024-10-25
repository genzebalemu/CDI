import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterStudentComponent } from './pages/auth/register-student/register-student.component';
import { CDIbenefitCardComponent } from './components/cdibenefit-card/cdibenefit-card.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, RegisterStudentComponent, CDIbenefitCardComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'CDI';

  ngOnInit(): void {
    
  }
}

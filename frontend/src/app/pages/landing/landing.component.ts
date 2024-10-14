import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './landing.component.html'
})
export class LandingComponent {

}

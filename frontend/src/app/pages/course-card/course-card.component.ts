import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {
  @Input() imageSrc: string | null = null;
  @Input() title: string = '';
  @Input() link: string = '#';
}

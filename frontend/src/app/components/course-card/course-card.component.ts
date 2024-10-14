import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {
  @Input() imageSrc: string | null = null;
  @Input() title: string = '';
  @Input() link: string = '#';
}

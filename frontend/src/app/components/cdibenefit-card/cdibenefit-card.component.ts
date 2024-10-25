import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular directives

@Component({
  selector: 'app-cdibenefit-card',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './cdibenefit-card.component.html'
})
export class CDIbenefitCardComponent {
  @Input() imgSrc: string = ' ';
  @Input() title: string = ' ';
  @Input() description: string = ' ';
}


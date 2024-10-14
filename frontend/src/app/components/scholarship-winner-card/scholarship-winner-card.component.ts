import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scholarship-winner-card',
  standalone: true,
  imports: [],
  templateUrl: './scholarship-winner-card.component.html'
})
export class ScholarshipWinnerCardComponent {
  @Input() name!: string;
  @Input() location!: string;
  @Input() imageSrc!: string;
}

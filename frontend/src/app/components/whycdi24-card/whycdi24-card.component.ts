import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-whycdi24-card',
  standalone: true,
  imports: [],
  templateUrl: './whycdi24-card.component.html'
})
export class Whycdi24CardComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}

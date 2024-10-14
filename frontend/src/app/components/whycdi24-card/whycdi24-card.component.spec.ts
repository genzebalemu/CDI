import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whycdi24CardComponent } from './whycdi24-card.component';

describe('Whycdi24CardComponent', () => {
  let component: Whycdi24CardComponent;
  let fixture: ComponentFixture<Whycdi24CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whycdi24CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whycdi24CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipWinnerCardComponent } from './scholarship-winner-card.component';

describe('ScholarshipWinnerCardComponent', () => {
  let component: ScholarshipWinnerCardComponent;
  let fixture: ComponentFixture<ScholarshipWinnerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipWinnerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipWinnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

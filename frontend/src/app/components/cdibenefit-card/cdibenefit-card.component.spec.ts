import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDIbenefitCardComponent } from './cdibenefit-card.component';

describe('CDIbenefitCardComponent', () => {
  let component: CDIbenefitCardComponent;
  let fixture: ComponentFixture<CDIbenefitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDIbenefitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDIbenefitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

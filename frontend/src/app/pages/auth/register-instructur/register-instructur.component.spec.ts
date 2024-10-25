import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstructurComponent } from './register-instructur.component';

describe('RegisterInstructurComponent', () => {
  let component: RegisterInstructurComponent;
  let fixture: ComponentFixture<RegisterInstructurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInstructurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInstructurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousCalculationsViewComponent } from './previous-calculations-view.component';

describe('PreviousCalculationsViewComponent', () => {
  let component: PreviousCalculationsViewComponent;
  let fixture: ComponentFixture<PreviousCalculationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousCalculationsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousCalculationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

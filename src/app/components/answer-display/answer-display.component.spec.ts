import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDisplayComponent } from './answer-display.component';

describe('AnswerDisplayComponent', () => {
  let component: AnswerDisplayComponent;
  let fixture: ComponentFixture<AnswerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

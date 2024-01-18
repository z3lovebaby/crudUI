import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCourseComponent } from './score-course.component';

describe('ScoreCourseComponent', () => {
  let component: ScoreCourseComponent;
  let fixture: ComponentFixture<ScoreCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

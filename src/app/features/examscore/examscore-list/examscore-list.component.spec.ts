import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamscoreListComponent } from './examscore-list.component';

describe('ExamscoreListComponent', () => {
  let component: ExamscoreListComponent;
  let fixture: ComponentFixture<ExamscoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamscoreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamscoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

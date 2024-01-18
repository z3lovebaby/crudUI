import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamscoreComponent } from './edit-examscore.component';

describe('EditExamscoreComponent', () => {
  let component: EditExamscoreComponent;
  let fixture: ComponentFixture<EditExamscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExamscoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditExamscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

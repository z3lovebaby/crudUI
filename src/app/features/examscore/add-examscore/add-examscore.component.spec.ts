import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamscoreComponent } from './add-examscore.component';

describe('AddExamscoreComponent', () => {
  let component: AddExamscoreComponent;
  let fixture: ComponentFixture<AddExamscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExamscoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

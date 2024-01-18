import { Component } from '@angular/core';
import { AddExamScoreRequest } from '../model/add-examscore-request.model';
import { ExamScoreService } from '../services/exam-score.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Course } from '../../course/model/course,model';
import { Student } from '../../student/model/student.model';
import { StudentService } from '../../student/services/student.service';
import { CourseService } from '../../course/services/course.service';
import { of, NEVER } from 'rxjs';
@Component({
  selector: 'app-add-examscore',
  templateUrl: './add-examscore.component.html',
  styleUrl: './add-examscore.component.css'
})
export class AddExamscoreComponent {
  public codeSelected = '';
  course$?: Observable<Course|null> =  NEVER;
  student$?: Observable<Student|null> = of(null);
  model: AddExamScoreRequest;
  private addExamScoreSubscribtion?: Subscription;
  constructor(private examscoreService: ExamScoreService,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router) {
    this.model = {
      stId:'',
      cId:'',
      score:0
    };
  }
  
  // ngOnInit(): void {
  //   this.student$ = this.studentService.getStudentById(this.model.stId);
  //   this.student$.subscribe(data => console.log(data));
  //   this.course$ = this.courseService.getCourseById(this.model.cId);
  // }
  onStIdChange() {
    if(this.model.stId)
      this.student$ = this.studentService.getStudentById(this.model.stId);
    else
      this.student$ = of(null);
}
  onCIdChange(){
    if(this.model.cId)
      this.course$ = this.courseService.getCourseById(this.model.cId);
    else
      this.course$ = of(null);
}
  onFormSubmit() {
    this.addExamScoreSubscribtion = this.examscoreService.addExamScore(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/examscores');
      },
      error: (error) => {
        // Handle the error
      }
    })
  }

  ngOnDestroy(): void {
    this.addExamScoreSubscribtion?.unsubscribe();
  }
}

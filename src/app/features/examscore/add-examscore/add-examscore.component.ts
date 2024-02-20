import { Component, OnInit } from '@angular/core';
import { AddExamScoreRequest } from '../model/add-examscore-request.model';
import { ExamScoreService } from '../services/exam-score.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { Course } from '../../course/model/course,model';
import { Student } from '../../student/model/student.model';
import { StudentService } from '../../student/services/student.service';
import { CourseService } from '../../course/services/course.service';
import { of, NEVER } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-examscore',
  templateUrl: './add-examscore.component.html',
  styleUrl: './add-examscore.component.css'
})

export class AddExamscoreComponent implements OnInit{
  public codeSelected = '';
  myControl = new FormControl('');
  course = new FormControl('');
  score = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]);
  options: Student[] = [];
  filteredOptions: Observable<Student[]> | undefined;
  courses:Course[]=[];
  filteredCourses: Observable<Course[]> | undefined;
  course$?: Observable<Course|null> =  NEVER;
  student$?: Observable<Student|null> = of(null);
  model: AddExamScoreRequest;
  private addExamScoreSubscribtion?: Subscription;
  constructor(private examscoreService: ExamScoreService,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService) {
    this.model = {
      stId:'',
      cId:'',
      score:0
    };
  }
  
  ngOnInit() {
    this.studentService.getAllStudents().subscribe({
      next: (student: Student[]) => {
        this.options = student;
        console.log('aaab ',this.options);
      },
      error: (error) => {
        console.error("Error fetching student:", error);
      }
    });
    this.courseService.getAllCategories().subscribe({
      next: (course: Course[]) => {
        this.courses = course;
        console.log('aaab ',this.courses);
      },
      error: (error) => {
        console.error("Error fetching course:", error);
      }
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(option => (option ? this._filter(option) : this.options.slice())),
    );
    this.filteredCourses = this.course.valueChanges.pipe(
      startWith(''),
      map(course => (course ? this._filterC(course) : this.courses.slice())),
    );
  }
  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private _filterC(value: string): Course[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(option => option.nameCourse.toLowerCase().includes(filterValue));
  }
  
  onFormSubmit() {
    const selectedStudent = this.options.find(option => option.name === this.myControl.value);
  if (selectedStudent) {
    this.model.stId = selectedStudent.id;
  } else {
    // Handle case when the selected student is not found
    console.error('Selected student not found');
    return;
  }

  // Similarly, find the corresponding course ID
  const selectedCourse = this.courses.find(course => course.nameCourse === this.course.value);
  if (selectedCourse) {
    this.model.cId = selectedCourse.id;
  } else {
    // Handle case when the selected course is not found
    console.error('Selected course not found');
    return;
  }

  this.model.score = parseFloat(this.score.value!!) || 0;

  console.log(this.model);
    this.addExamScoreSubscribtion = this.examscoreService.addExamScore(this.model)
    .subscribe({
      next: (response) => {
        this.toastr.success(response, 'Sucess', { positionClass: 'toast-bottom-right' });
        this.router.navigateByUrl('/admin/examscores');
      },
      error: (error) => {
        this.toastr.error(error.error, 'Error', { positionClass: 'toast-bottom-right' });
        // Handle the error
      }
    })
  }

  ngOnDestroy(): void {
    this.addExamScoreSubscribtion?.unsubscribe();
  }
}

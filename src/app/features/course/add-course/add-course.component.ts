import { Component, OnDestroy } from '@angular/core';
import { AddCourseRequest } from '../model/add-course-request.model';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnDestroy{
  model: AddCourseRequest;
  private addCourseSubscribtion?: Subscription;

  constructor(private courseService: CourseService,
    private router: Router) {
    this.model = {
      nameCourse: '',
    };
  }


  onFormSubmit() {
    this.addCourseSubscribtion = this.courseService.addCourse(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/courses');
      },
      error: (error) => {
        // Handle the error
      }
    })
  }

  ngOnDestroy(): void {
    this.addCourseSubscribtion?.unsubscribe();
  }
}

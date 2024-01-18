import { Component, OnDestroy } from '@angular/core';
import { AddCourseRequest } from '../model/add-course-request.model';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnDestroy{
  model: AddCourseRequest;
  private addCourseSubscribtion?: Subscription;

  constructor(private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService ) {
    this.model = {
      nameCourse: '',
    };
  }


  onFormSubmit() {
    this.addCourseSubscribtion = this.courseService.addCourse(this.model)
    .subscribe({
      next: (response) => {
        this.toastr.success(response, 'Sucess', { positionClass: 'toast-bottom-right' });
        this.router.navigateByUrl('/admin/courses');
      },
      error: (error) => {
        this.toastr.error(error.error, 'Error', { positionClass: 'toast-bottom-right' });
        // Handle the error
      }
    })
  }

  ngOnDestroy(): void {
    this.addCourseSubscribtion?.unsubscribe();
  }
}

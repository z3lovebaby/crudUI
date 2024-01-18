import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../model/course,model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { UpdateCourseRequest } from '../model/update-category-request.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit, OnDestroy{
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCourseSubscription?: Subscription;
  course?: Course;

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this course Id
          this.courseService.getCourseById(this.id)
          .subscribe({
            next: (response) => {
              this.course = response;
            }
          });

        }
      }
    });
  }

  onFormSubmit(): void {
    const updateCourseRequest: UpdateCourseRequest = {
      id:this.course?.id ?? '',
      nameCourse: this.course?.nameCourse ?? '',
    };

    // pass this object to service
    if (this.id) {
      this.editCourseSubscription = this.courseService.updateCourse(this.id, updateCourseRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/courses');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.courseService.deleteCourse(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/courses');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCourseSubscription?.unsubscribe();
  }
}

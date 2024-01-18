import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../model/course,model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { UpdateCourseRequest } from '../model/update-category-request.model';
import { ToastrService } from 'ngx-toastr';

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
  showModal = false;

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService) {
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
  onDelete() {
    this.showModal = true;
    console.log(this.showModal);
  }

  closeModal() {
    this.showModal = false;
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

  onConfirm(): void {
    if (this.id) {
      this.courseService.deleteCourse(this.id)
      .subscribe({
        next: (response) => {
          this.toastr.success(response, 'Sucess', { positionClass: 'toast-bottom-right' });
          this.router.navigateByUrl('/admin/courses');
        }
      })
      
    }
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCourseSubscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course,model';
import { CourseService } from '../services/course.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  user?: User;
  courses$?: Observable<Course[]>;

  constructor(private courseService: CourseService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCategories();
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });
    this.user = this.authService.getUser();
  }
}

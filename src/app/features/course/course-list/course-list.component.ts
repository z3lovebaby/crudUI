import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course,model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses$?: Observable<Course[]>;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCategories();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course,model';
import { CourseService } from '../services/course.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  user?: User;
  courses$?: Observable<Course[]>;
  displayedColumns: string[] = ['id','courseName','actions'];
          dataSource = new MatTableDataSource<Course>;
          @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
          @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private courseService: CourseService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.courseService.getAllCategories().subscribe({
      next: (course: Course[]) => {
        this.dataSource.data = course;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('aaab ',this.dataSource);
      },
      error: (error) => {
        console.error("Error fetching exam scores:", error);
      }
    });;;
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });
    this.user = this.authService.getUser();
  }
}

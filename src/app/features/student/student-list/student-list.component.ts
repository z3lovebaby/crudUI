import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';
import { StudentService } from '../services/student.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExamScore } from '../../examscore/model/examscore.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  user?: User;
  students$?: Observable<Student[]>;
  displayedColumns: string[] = ['studentID', 'studentName', 'DOB', 'Class', 'actions'];
          dataSource = new MatTableDataSource<Student>;
          @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
          @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private studentService: StudentService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe({
      next: (student: Student[]) => {
        this.dataSource.data = student;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('aaab ',this.dataSource);
      },
      error: (error) => {
        console.error("Error fetching exam scores:", error);
      }
    });;
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });
    this.user = this.authService.getUser();
  }
}

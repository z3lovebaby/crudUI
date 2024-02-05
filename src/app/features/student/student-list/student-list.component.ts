import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';
import { StudentService } from '../services/student.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  user?: User;
  students$?: Observable<Student[]>;

  constructor(private studentService: StudentService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });
    this.user = this.authService.getUser();
  }
}

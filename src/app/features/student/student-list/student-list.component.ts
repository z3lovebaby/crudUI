import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students$?: Observable<Student[]>;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.students$ = this.studentService.getAllStudents();
  }
}

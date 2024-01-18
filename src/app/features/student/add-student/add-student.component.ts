import { Component } from '@angular/core';
import { AddStudentRequest } from '../model/add-student-request.model';
import { Subscription } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  model: AddStudentRequest;
  private addStudentSubscribtion?: Subscription;

  constructor(private studentService: StudentService,
    private router: Router) {
    this.model = {
      name:'',
      date:'',
      class:''
    };
  }


  onFormSubmit() {
    this.addStudentSubscribtion = this.studentService.addStudent(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/students');
      },
      error: (error) => {
        // Handle the error
      }
    })
  }

  ngOnDestroy(): void {
    this.addStudentSubscribtion?.unsubscribe();
  }
}

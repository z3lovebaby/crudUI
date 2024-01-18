import { Component } from '@angular/core';
import { AddStudentRequest } from '../model/add-student-request.model';
import { Subscription } from 'rxjs';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  model: AddStudentRequest;
  private addStudentSubscribtion?: Subscription;

  constructor(private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService) {
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
        this.toastr.success(response, 'Sucess', { positionClass: 'toast-bottom-right' });
        this.router.navigateByUrl('/admin/students');
      },
      error: (error) => {
        // Handle the error
        this.toastr.error(error.error, 'Error', { positionClass: 'toast-bottom-right' });
      }
    })
  }

  ngOnDestroy(): void {
    this.addStudentSubscribtion?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from '../model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { UpdateStudentRequest } from '../model/update-student-request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit, OnDestroy{
  id: string | null = null;
  paramsSubscription?: Subscription;
  editStudentSubscription?: Subscription;
  student?: Student;
  showModal = false;
  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this student Id
          this.studentService.getStudentById(this.id)
          .subscribe({
            next: (response) => {
              this.student = response;
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
  onConfirm(): void {
    if (this.id) {
      this.studentService.deleteStudent(this.id)
      .subscribe({
        next: (response) => {
          this.toastr.success(response, 'Sucess', { positionClass: 'toast-bottom-right' });
          this.router.navigateByUrl('/admin/students');
        }
      })
    }

    this.showModal = false;
  }
  onFormSubmit(): void {
    const updateStudentRequest: UpdateStudentRequest = {
      id:this.student?.id ?? '',
      name: this.student?.name ?? '',
      date:this.student?.date ?? '',
      class:this.student?.class ?? '',

    };

    // pass this object to service
    if (this.id) {
      this.editStudentSubscription = this.studentService.updateStudent(this.id, updateStudentRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/students');
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editStudentSubscription?.unsubscribe();
  }
}

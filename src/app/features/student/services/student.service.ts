import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddStudentRequest } from '../model/add-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }
  
  getAllStudents(): Observable<Student[]> {
      return this.http.get<Student[]>(`${environment.apiBaseUrl}/api/student`);
    }
  addStudent(model: AddStudentRequest): Observable<string> {
      return this.http.post(`${environment.apiBaseUrl}/api/student?addAuth=true`, model,{ responseType: 'text' });
    }
  getStudentById(id: string): Observable<Student> {
      return this.http.get<Student>(`${environment.apiBaseUrl}/api/student/${id}`);
    }
    updateStudent(id: string, updateStudentRequest: AddStudentRequest): Observable<String> {
      const url = `${environment.apiBaseUrl}/api/student/?id=${id}&addAuth=true`;
      return this.http.put(url, updateStudentRequest,{ responseType: 'text' });
    }
    
  
  deleteStudent(id: string) : Observable<string> {
      return this.http.delete(`${environment.apiBaseUrl}/api/student/${id}?addAuth=true`,{ responseType: 'text' })
    }  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Course } from '../model/course,model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddCourseRequest } from '../model/add-course-request.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }
  
  getAllCategories(): Observable<Course[]> {
      return this.http.get<Course[]>(`${environment.apiBaseUrl}/api/course`);
    }
  addCourse(model: AddCourseRequest): Observable<string> {
      return this.http.post(`${environment.apiBaseUrl}/api/course?addAuth=true`, model,{ responseType: 'text' });
    }
  getCourseById(id: string): Observable<Course> {
      return this.http.get<Course>(`${environment.apiBaseUrl}/api/course/${id}`);
    }
    updateCourse(id: string, updateCourseRequest: AddCourseRequest): Observable<String> {
      const url = `${environment.apiBaseUrl}/api/course/?id=${id}&addAuth=true`;
      return this.http.put(url, updateCourseRequest,{ responseType: 'text' });
    }
    
  
  deleteCourse(id: string) : Observable<string> {
      return this.http.delete(`${environment.apiBaseUrl}/api/course/${id}?addAuth=true`,{ responseType: 'text' })
    }  
}

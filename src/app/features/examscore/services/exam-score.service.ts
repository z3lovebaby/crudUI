import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ExamScore } from '../model/examscore.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddExamScoreRequest } from '../model/add-examscore-request.model';
import { UpdateExamScoreRequest } from '../model/update-examscore-request.model';
import { ScoreCourse } from '../model/score-course.model';

@Injectable({
  providedIn: 'root'
})
export class ExamScoreService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }
  
  getAllExamScores(): Observable<ExamScore[]> {
      return this.http.get<ExamScore[]>(`${environment.apiBaseUrl}/api/examscore`);
    }
    getScoreCourse(cId:string): Observable<ScoreCourse[]> {
      return this.http.get<ScoreCourse[]>(`${environment.apiBaseUrl}/api/examscore/GetExamScoresByCourse/${cId}`);
    }
    getScoreStudent(stId:string): Observable<ScoreCourse[]> {
      return this.http.get<ScoreCourse[]>(`${environment.apiBaseUrl}/api/examscore/GetExamScoresByStudent/${stId}`);
    }
  addExamScore(model: AddExamScoreRequest): Observable<string> {
      return this.http.post(`${environment.apiBaseUrl}/api/examscore?addAuth=true`, model,{ responseType: 'text' });
    }
  getExamScoreById(id: string): Observable<ExamScore> {
      return this.http.get<ExamScore>(`${environment.apiBaseUrl}/api/examscore/${id}`);
    }
    updateExamScore(id: string, updateExamScoreRequest: UpdateExamScoreRequest): Observable<String> {
      const url = `${environment.apiBaseUrl}/api/examscore/?id=${id}&addAuth=true`;
      return this.http.put(url, updateExamScoreRequest,{ responseType: 'text' });
    }
    
  
  deleteExamScore(id: string) : Observable<string> {
      return this.http.delete(`${environment.apiBaseUrl}/api/examscore/${id}?addAuth=true`,{ responseType: 'text' })
    } 
}

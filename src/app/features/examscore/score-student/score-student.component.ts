import { Component } from '@angular/core';
import { ScoreStudent } from '../model/score-student.model';
import { Observable } from 'rxjs';
import { ExamScoreService } from '../services/exam-score.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score-student',
  templateUrl: './score-student.component.html',
  styleUrl: './score-student.component.css'
})
export class ScoreStudentComponent {
  scorestudent$?: Observable<ScoreStudent[]>;
  courseId?: string;
  constructor(
    private examscoreService: ExamScoreService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    // Extract courseId from the URL
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')??'';
      // Now you can use this.courseId to pass it to the getScoreCourse function
      this.scorestudent$ = this.examscoreService.getScoreStudent(this.courseId);
    });
  }
}

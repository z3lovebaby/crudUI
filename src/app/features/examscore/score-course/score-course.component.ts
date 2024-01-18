import { Component } from '@angular/core';
import { ScoreCourse } from '../model/score-course.model';
import { Observable } from 'rxjs';
import { ExamScoreService } from '../services/exam-score.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score-course',
  templateUrl: './score-course.component.html',
  styleUrl: './score-course.component.css'
})
export class ScoreCourseComponent {
  scorecourse$?: Observable<ScoreCourse[]>;
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
      this.scorecourse$ = this.examscoreService.getScoreCourse(this.courseId);
    });
  }
}

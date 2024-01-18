import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ExamScoreService } from '../services/exam-score.service';


@Component({
  selector: 'app-examscore-list',
  templateUrl: './examscore-list.component.html',
  styleUrl: './examscore-list.component.css'
})
export class ExamscoreListComponent {
  examscores$?: Observable<ExamScore[]>;

  constructor(private examscoreService: ExamScoreService) {
  }

  ngOnInit(): void {
    this.examscores$ = this.examscoreService.getAllExamScores();
  }
}

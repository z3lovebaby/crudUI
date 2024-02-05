import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ExamScoreService } from '../services/exam-score.service';


@Component({
  selector: 'app-examscore-list',
  templateUrl: './examscore-list.component.html',
  styleUrl: './examscore-list.component.css'
})
export class ExamscoreListComponent implements OnInit{
  examscores$!: Observable<ExamScore[]>;
  examscoresFilter:any=[];
  examscores:any=[];
    stIDFilter = "";
    nameFilter = "";
    cFilter = "";
    classFilter = "";
    scoreFilter = "";
  constructor(private examscoreService: ExamScoreService) {
  }

  ngOnInit(): void {
    this.examscoreService.getAllExamScores().subscribe({
      next: (examscore: ExamScore[]) => {
        this.examscoresFilter = examscore;
        console.log('aaab ',this.examscoresFilter);
        this.FilterFn();
      },
      error: (error) => {
        console.error("Error fetching exam scores:", error);
      }
    });
  }
  FilterFn() {
    this.examscores = this.examscoresFilter.filter((score: ExamScore) =>
      (!this.stIDFilter || score.student.id.toString().includes(this.stIDFilter)) &&
      (!this.nameFilter || score.student.name.includes(this.nameFilter)) &&
      (!this.cFilter || score.course.nameCourse.includes(this.cFilter)) &&
      (!this.classFilter || score.student.class.includes(this.classFilter)) &&
      (!this.scoreFilter || score.score.toString().includes(this.scoreFilter))
    );
  }
}

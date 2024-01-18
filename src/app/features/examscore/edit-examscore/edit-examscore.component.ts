import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamScoreService } from '../services/exam-score.service';
import { UpdateExamScoreRequest } from '../model/update-examscore-request.model';

@Component({
  selector: 'app-edit-examscore',
  templateUrl: './edit-examscore.component.html',
  styleUrl: './edit-examscore.component.css'
})
export class EditExamscoreComponent implements OnInit, OnDestroy{
  id: string | null = null;
  paramsSubscription?: Subscription;
  editExamScoreSubscription?: Subscription;
  examscore?: ExamScore;

  constructor(private route: ActivatedRoute,
    private examscoreService: ExamScoreService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this examscore Id
          this.examscoreService.getExamScoreById(this.id)
          .subscribe({
            next: (response) => {
              this.examscore = response;
            }
          });

        }
      }
    });
  }

  onFormSubmit(): void {
    const updateExamScoreRequest: UpdateExamScoreRequest = {
      id:this.examscore?.id??'',
      stId:this.examscore?.stId??'',
      cId:this.examscore?.cId??'',
      score:this.examscore?.score ?? 0,

    };

    // pass this object to service
    if (this.id) {
      this.editExamScoreSubscription = this.examscoreService.updateExamScore(this.id, updateExamScoreRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/examscores');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.examscoreService.deleteExamScore(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/examscores');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editExamScoreSubscription?.unsubscribe();
  }
}

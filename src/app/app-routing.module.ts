import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { CourseListComponent } from './features/course/course-list/course-list.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { AddCourseComponent } from './features/course/add-course/add-course.component';
import { EditCourseComponent } from './features/course/edit-course/edit-course.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { AddStudentComponent } from './features/student/add-student/add-student.component';
import { EditStudentComponent } from './features/student/edit-student/edit-student.component';
import { ExamscoreListComponent } from './features/examscore/examscore-list/examscore-list.component';
import { AddExamscoreComponent } from './features/examscore/add-examscore/add-examscore.component';
import { EditExamscoreComponent } from './features/examscore/edit-examscore/edit-examscore.component';
import { ScoreCourseComponent } from './features/examscore/score-course/score-course.component';
import { ScoreStudentComponent } from './features/examscore/score-student/score-student.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin/courses',
    component: CourseListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/students',
    component: StudentListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/examscores',
    component: ExamscoreListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/examscores/add',
    component: AddExamscoreComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/courses/add',
    component: AddCourseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/students/add',
    component: AddStudentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/course/:id',
    component: EditCourseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/student/:id',
    component: EditStudentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/examscore/:id',
    component: EditExamscoreComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/studentOfCourse/:id',
    component: ScoreCourseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/scoreOfStudent/:id',
    component: ScoreStudentComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

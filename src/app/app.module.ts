import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CourseListComponent } from './features/course/course-list/course-list.component';
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
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CourseListComponent,
    AddCourseComponent,
    EditCourseComponent,
    StudentListComponent,
    AddStudentComponent,
    EditStudentComponent,
    ExamscoreListComponent,
    AddExamscoreComponent,
    EditExamscoreComponent,
    ScoreCourseComponent,
    ScoreStudentComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

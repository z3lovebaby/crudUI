import { Course } from "../../course/model/course,model";
import { Student } from "../../student/model/student.model";

export interface ExamScore {
    id: string;
    stId:string;
    cId:string;
    student:Student;
    course:Course;
    score:number;
  }
  
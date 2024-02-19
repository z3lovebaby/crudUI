import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ExamScoreService } from '../services/exam-score.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { FilterSelectOption } from '../model/filter.model';

@Component({
  selector: 'app-examscore-list',
  templateUrl: './examscore-list.component.html',
  styleUrl: './examscore-list.component.css'
})
export class ExamscoreListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'stId', 'studentName', 'courseName', 'studentClass', 'score', 'actions'];
          dataSource = new MatTableDataSource<ExamScore>;
          @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
          @ViewChild(MatSort, { static: true }) sort!: MatSort;
  examscores$!: Observable<ExamScore[]>;
  examscoresFilter:any=[];
  examscores:any=[];
    stIDFilter = "";
    nameFilter = "";
    cFilter = "";
    classFilter = "";
    scoreFilter = "";
    filterSelectObj : FilterSelectOption[]= [];
    filterValues: { [key: string]: string } = {};
  constructor(private examscoreService: ExamScoreService) {
    this.filterSelectObj = [
      {
        name: 'STUDENTID',
        columnProp: 'stId',
        options: []
      }, {
        name: 'NAME',
        columnProp: 'student.name',
        options: []
      }, {
        name: 'COURSE',
        columnProp: 'course.nameCourse',
        options: []
      }, {
        name: 'CLASS',
        columnProp: 'student.class',
        options: []
      }, {
        name: 'SCORE',
        columnProp: 'score',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.FetchData();
    this.dataSource.filterPredicate = this.createFilter()
  }
  // getFilterObject(fullObj: any[], key: string): any[] {
  //   const uniqChk: any[] = [];
  //   fullObj.filter((obj: any) => {
  //     if (!uniqChk.includes(obj[key])) {
  //       uniqChk.push(obj[key]);
  //     }
  //     return obj;
  //   });
  //   return uniqChk;
  // }
  getFilterObject(fullObj: any[], key: string): any[] {
    const uniqChk: any[] = [];
    fullObj.forEach((obj: any) => {
      let value = obj;
      const props = key.split('.'); // Tách chuỗi key thành mảng các thuộc tính
      props.forEach(prop => {
        value = value[prop]; // Truy cập đến giá trị cuối cùng của thuộc tính
      });
      if (!uniqChk.includes(value)) {
        uniqChk.push(value);
      }
    });
    return uniqChk;
  }
  
  FetchData(){
    this.examscoreService.getAllExamScores().subscribe({
      next: (examscore: ExamScore[]) => {
        this.examscoresFilter = examscore;
        this.dataSource.data = examscore;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('aaab ',this.dataSource);
        this.filterSelectObj.filter((o) => {
          o.options = this.getFilterObject(examscore, o.columnProp);
        });
      },
      error: (error) => {
        console.error("Error fetching exam scores:", error);
      }
    });
    
  }
  // Called on Filter change
  filterChange(filter:FilterSelectOption, event:any) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
    
    console.log('JSON: ',JSON.stringify(this.filterValues));
  }
  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      console.log('data1: ',data);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            if (data[col] !== undefined) {
              const props = col.split('.'); // Tách chuỗi col thành mảng các thuộc tính
              let value = data;
              props.forEach(prop => {
                value = value[prop]; // Truy cập đến giá trị cuối cùng của thuộc tính
              });
              searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
                if (value && value.toString().toLowerCase().includes(word)) {
                  found = true;
                }
              });
            }
          }
          return found;
        } else {
          return true;
        }
      }
      
      return nameSearch()
    }
    return filterFunction
  }


  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }
}

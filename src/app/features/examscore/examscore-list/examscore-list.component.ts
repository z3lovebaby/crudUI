import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ExamScoreService } from '../services/exam-score.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { FilterSelectOption } from '../model/filter.model';
import { FormControl } from '@angular/forms';

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
  myControl = new FormControl('');
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
        name: 'student id',
        columnProp: 'stId',
        options: [],
        selectedValue:'',
        inputValue:'',
        filteredOptions:[],
      }, {
        name: 'name',
        columnProp: 'student.name',
        options: [],
        selectedValue:'',
        inputValue:'',
        filteredOptions:[],
      }, {
        name: 'course',
        columnProp: 'course.nameCourse',
        options: [],
        selectedValue:'',
        inputValue:'',
        filteredOptions:[],
      }, {
        name: 'class',
        columnProp: 'student.class',
        options: [],
        selectedValue:'',
        inputValue:'',
        filteredOptions:[],
      }, {
        name: 'score',
        columnProp: 'score',
        options: [],
        selectedValue:'',
        inputValue:'',
        filteredOptions:[],
      }
    ]
  }

  ngOnInit(): void {
    this.FetchData();
    this.dataSource.filterPredicate = this.createFilter()
    this.filterSelectObj.forEach(obj => {
      obj.filteredOptions = this._filter(obj.inputValue || '', obj.options);
    });
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
  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
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
          o.filteredOptions = o.options
        });
      },
      error: (error) => {
        console.error("Error fetching exam scores:", error);
      }
    });
    
  }
  // Called on Filter change
  // filterChange(filter:FilterSelectOption, event:any) {
  //   //let filterValues = {}
  //   this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
  //   this.dataSource.filter = JSON.stringify(this.filterValues)
    
  //   console.log('JSON: ',JSON.stringify(this.filterValues));
  // }

  filterChange(filter: FilterSelectOption, event: any) {
    let value: string;
    
    // Kiểm tra xem sự kiện có phải từ autocomplete hay không
    if (event.option) {
      // Nếu là sự kiện từ autocomplete, lấy giá trị của option được chọn
      value = event.option.value.toString();
    } else {
      // Nếu là sự kiện từ trường input, lấy giá trị từ target
      value = event.target.value.trim().toLowerCase();
    }
    // Lưu giá trị vào filterValues
    this.filterValues[filter.columnProp] = value;
    filter.filteredOptions = filter.options.filter(option =>
      option.toString().toLowerCase().includes(value)
    );
    console.log('flter: ',filter.options)
    // Áp dụng bộ lọc mới vào dataSource
    this.dataSource.filter = JSON.stringify(this.filterValues);
  
    console.log('JSON: ', JSON.stringify(this.filterValues));
  }
  
  onInputChange(filter:FilterSelectOption, event:any){}
  getValueByNestedKey(obj:any, key:string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      return keys.reduce((acc, curr) => acc && acc[curr], obj);
    } else {
      return obj[key];
    }
  }
  // Custom filter method fot Angular Material Datatable
// Custom filter method for Angular Material Datatable
createFilter() {
  let filterFunction = (data: any, filter: string): boolean => {
    let searchTerms = JSON.parse(filter);
    let isFilterSet = false;

    // Kiểm tra xem có bộ lọc nào được áp dụng không
    for (const col in searchTerms) {
      if (searchTerms[col].toString() !== '') {
        isFilterSet = true;
        break;
      }
    }

    // Nếu không có bộ lọc nào được áp dụng, trả về true
    if (!isFilterSet) {
      return true;
    }

    // Kiểm tra từng bộ lọc
    for (const col in searchTerms) {
      // Nếu bộ lọc không được nhập giá trị, bỏ qua
      if (searchTerms[col].toString() === '') {
        continue;
      }

      // Lấy giá trị từ key
      const keys = col.split('.');
      let value = data;
      keys.forEach(key => {
        value = value[key];
      });

      // Nếu giá trị không tồn tại hoặc không chứa từ khóa filter, trả về false
      if (value === undefined || !value.toString().toLowerCase().includes(searchTerms[col].trim().toLowerCase())) {
        return false;
      }
    }

    // Nếu tất cả các điều kiện đều được thỏa mãn, trả về true
    return true;
  };

  return filterFunction;
}

  


  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.selectedValue = '';
      value.inputValue = '';
    })
    this.dataSource.filter = "";
  }
}

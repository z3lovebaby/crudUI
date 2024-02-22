import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamScore } from '../model/examscore.model';
import { ExamScoreService } from '../services/exam-score.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { FilterSelectOption } from '../model/filter.model';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-examscore-list',
  templateUrl: './examscore-list.component.html',
  styleUrl: './examscore-list.component.css'
})
export class ExamscoreListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'stId', 'studentName', 'courseName', 'studentClass', 'score', 'actions'];
          //dataSource = new MatTableDataSource();
          dataSource2 = new MatTableDataSource();
          @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
          @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource : any = []
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
    pageNumber: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  totalRecords: number = 0;
  nextPage: string | null = null;
  previousPage: string | null = null;
  firstPage: string | null = null;
  lastPage: string | null = null;
  constructor(private examscoreService: ExamScoreService,
    private http: HttpClient) {
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
    this.dataSource2.filterPredicate = this.createFilter()
    console.log('abcd: ',this.dataSource)
    this.filterSelectObj.forEach(obj => {
      obj.filteredOptions = this._filter(obj.inputValue || '', obj.options);
    });
    console.log('final: ',this.dataSource)
  }
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
    this.examscoreService.getAllExamScores(this.pageNumber,this.pageSize,null).subscribe({
      next: (res: any) => {
        console.log('res',res.data)
        this.examscoresFilter = res.data;
        this.dataSource2.data = res.data;
        this.dataSource = res.data
        console.log('check ',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('aaab ',this.dataSource);
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalRecords = res.totalRecords;
        this.nextPage = res.nextPage;
        this.previousPage = res.previousPage;
        this.firstPage = res.firstPage;
        this.lastPage = res.lastPage;
        this.filterSelectObj.filter((o) => {
          o.options = this.getFilterObject(this.dataSource2.data, o.columnProp);
          o.filteredOptions = o.options
        });
        console.log('log:',this.dataSource)
        // this.dataSource2 = this.dataSource;
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
    } else{
      // Nếu là sự kiện từ trường input, lấy giá trị từ target
      value = event.target.value.trim().toLowerCase();
    }
    // Lưu giá trị vào filterValues
    this.filterValues[filter.columnProp] = value;
    filter.filteredOptions = filter.options.filter(option =>
      option.toString().toLowerCase().includes(value)
    );
    console.log('flter: ',filter.filteredOptions)
    // Áp dụng bộ lọc mới vào dataSource
    this.dataSource2.filter = JSON.stringify(this.filterValues);
    this.dataSource = this.dataSource2.filteredData;
    this.totalRecords = this.dataSource.length
    
    console.log()
    console.log('JSON: ',this.dataSource);
  }
  
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
    // console.log('check22s: ',data,filter)
    let searchTerms = JSON.parse(filter);
    let isFilterSet = false;
    console.log('check22s: ',searchTerms)
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
    // this.dataSource = this.dataSource2;
    // console.log(this.dataSource)
    this.pageSize = this.paginator.pageSize
    this.FetchData();
    this.paginator.pageIndex = 0;

  }
  
  goToPage(event: any) {
    console.log('pre: ',this.previousPage);
    console.log('next p: ',this.nextPage);
   console.log('event',event);
  //  event.previousPageIndex++;
   event.pageIndex++;
  //  if(event.previousPageIndex  > event.pageIndex) {
     console.log('!next');
     this.examscoreService.getAllExamScores(event.pageIndex,event.pageSize,null).subscribe({
      next: (response: any) => {
      console.log('test res',response)
      this.dataSource = response.data;
      // this.pageNumber = response.pageNumber;
      // this.pageSize = response.pageSize;
      // this.totalPages = response.totalPages;
      this.totalRecords = response.totalRecords;
      console.log(this.totalRecords)
      // this.nextPage = response.nextPage;
      // this.previousPage = response.previousPage;
      // this.firstPage = response.firstPage;
      // this.lastPage = response.lastPage;
    },
    error: (error) => {
      console.error("Error fetching exam scores:", error);
    }});
    
  //  } else {
  //    // Clicked on previous button
  //     this.examscoreService.getAllExamScores(this.pageNumber+1,this.pageSize,this.nextPage).subscribe({
  //       next: (response: any) => {
  //       console.log('test res',response)
  //       this.dataSource.data = response.data;
  //       console.log(this.dataSource.data)
  //       this.pageNumber = response.pageNumber;
  //       this.pageSize = response.pageSize;
  //       this.totalPages = response.totalPages;
  //       this.totalRecords = response.totalRecords;
  //       this.nextPage = response.nextPage;
  //       this.previousPage = response.previousPage;
  //       this.firstPage = response.firstPage;
  //       this.lastPage = response.lastPage;
  //     },
  //     error: (error) => {
  //       console.error("Error fetching exam scores:", error);
  //     }});
  //    }
   console.log('dataaaa',this.dataSource)
   // The code that you want to execute on clicking on next and previous buttons will be written here.
    // if (pageUrl) {
    // }
  }
}

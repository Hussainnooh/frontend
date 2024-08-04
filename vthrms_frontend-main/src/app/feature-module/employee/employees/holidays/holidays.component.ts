import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getholidays, routes } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  title = 'pagination';
  public routes = routes;
  public lstHolidays: any;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getholidays>;
  public addHolidayForm!: FormGroup;

  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  //** / pagination variables

  constructor(private formBuilder: FormBuilder,private data: DataService) {
    this.addHolidayForm = this.formBuilder.group({
      //name_ar: ['', Validators.required],
      name_en: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      //number_of_days: ['', Validators.required],
      //year: ['', Validators.required]
    });
    
  } 
  
   //here addHoliday 

   addHoliday(){
    
    this.data.addHolidays(this.addHolidayForm.value).subscribe((res: any) => {
      console.log(" dataservice addHoliday")
      console.log(res)
    
}); }

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.lstHolidays = [];
    this.serialNumberArray = [];

 // here getholidays    
   this.data.getholidays().subscribe((res: apiResultFormat) => {
    console.log(" data getholidays")
    console.log(res)

    this.lstHolidays = res;  });

    /*this.data.getholidays().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getholidays, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstHolidays.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getholidays>(this.lstHolidays);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });*/

 
  }


  public sortData(sort: Sort) {
    const data = this.lstHolidays.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstHolidays = data;
    } else {
      this.lstHolidays = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstHolidays = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event === 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event === 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
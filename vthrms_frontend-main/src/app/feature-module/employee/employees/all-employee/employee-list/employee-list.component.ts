import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { Router } from '@angular/router';
import { DataService, apiResultFormat, getEmployees, routes , /*AuthService*/ } from 'src/app/core/core.index';
//import { HttpClient } from  '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  selected = 'option1';
  public searchDataValue = '';
  dataSource!: MatTableDataSource<getEmployees>;
  public routes = routes;
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
  public addEmployeeForm!: FormGroup ;
  public lstEmployee : any;
  public Designationlist: any;
  public selectDesignation : any;
  public RolesList: any;
  
  
  // pagination variables
    /*mydata:any;
  constructor(private data: DataService , private authservice:AuthService){}
 => apper error in ngOnInit ngOnInit():void {
 =>also in subscribe there is erreo but if i change getdata to getuser its disapper=>this.authservice.getdata().subscribe(res => {
    console.log(res);
  })
}*/
    //user:any;
    /*constructor(private data: DataService){
      this.user.getData().subscribe((data: any) =>{console.warn(data)})
      this.data=data
    }*/
  /*constructor(private data: DataService , private router: Router ,private fb: FormBuilder,private authservice:AuthService) {
    this.initForm()
  }*/
  /*initForm() {
    this.authservice.getuser().subscribe(
     (response) => { this.user = response;

       console.log('testfunction')
       console.log(response)


      },
     (error) => { console.log(error); });
}*/
  constructor(private formBuilder: FormBuilder,private data: DataService) {

  // add employee form validation
  this.addEmployeeForm = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
   /* UserName: ["", [Validators.required]],*/
    password: ['', [Validators.required]],
    ConfirmPassword: ['', [Validators.required]],
    roleId: ['', [Validators.required]],
    designationID: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    JoinDate: ['', [Validators.required]],
    CompanyName: ['', [Validators.required]],
    EmployeeID: ['', [Validators.required]],
  });
  
}
//here addemployee

addemployee(){
    
  this.data.addemployee(this.addEmployeeForm.value).subscribe((res) => {
    console.log(" dataservice addemployee")
    console.log(res)
  
});  }

  ngOnInit(): void {
    this.getTableData();
    
  }

  private getTableData(): void {
    this.lstEmployee = [];
    this.serialNumberArray = [];
    this.Designationlist=[];
    console.log('beforegetemployees')

// here getEmployees
    this.data.getEmployees().subscribe((res: apiResultFormat) => {
      console.log(" data  halllooo  getEmployees")
      console.log(res)
  
      this.lstEmployee = res;  });

    console.log('beforegetDesignations')

// here getDesignations
      this.data.getDesignations().subscribe((res) => {
        console.log(" dataservice getdestinations")
        console.log(res)
    
        this.Designationlist = res; });
    
// here getroles 
        this.data.getRoles().subscribe((res) => {
          console.log("dataservice getroles")
          console.log(res)
      
          this.RolesList = res;});

        }

    /*this.data.getEmployees().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getEmployees, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstEmployee.push(res);
          console.log('Employeelist')

          console.log( this.lstEmployee)
          this.serialNumberArray.push(serialNumber);
        }
      });
         this.dataSource = new MatTableDataSource<getEmployees>(this.lstEmployee);
    this.calculateTotalPages(this.totalData, this.pageSize);
    });*/

  //}

  

  

  public sortData(sort: Sort) {
    const data = this.lstEmployee.slice();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!sort.active || sort.direction === '') {
      this.lstEmployee = data;
    } else {
      this.lstEmployee = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstEmployee = this.dataSource.filteredData;
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

/*export class AuthService  {
  constructor(public router: Router, private http: HttpClient ) {}
  getuser() { return  this.http.get<any>(`${environment.apiUrl}/user/allEmployees`)}
}*/


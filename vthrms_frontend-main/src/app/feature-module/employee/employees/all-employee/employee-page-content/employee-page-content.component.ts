import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { DataService, apiResultFormat, getEmployees, lstEmployee, routes } from 'src/app/core/core.index';

import { pageSelection } from '../employee-list/employee-list.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



@Component({

  selector: 'app-employee-page-content',

  templateUrl: './employee-page-content.component.html',

  styleUrls: ['./employee-page-content.component.scss'],

})

export class EmployeePageContentComponent {

  public routes = routes;

  selected = 'option1';



  public lstEmployee: any 

  public searchDataValue = '';

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
  Designationlist: any;


  constructor(private formBuilder: FormBuilder, public router: Router, public dataservice: DataService) {



    console.log("before get employee")

// add employee form validation
this.addEmployeeForm = this.formBuilder.group({
  designationID: ["", [Validators.required]],

});


this.dataservice.getDesignations().subscribe((res) => {
  console.log(" dataservice getdestinations")
  console.log(res)

  this.Designationlist = res; });

  

    this.dataservice.getEmployees().subscribe((res) => {
      console.log(" dataservice getemployee")
      console.log(res)

      this.lstEmployee = res;

      /*res.data.map((res: getEmployees, index: number) => {

        const serialNumber = index + 1;

        if (index >= this.skip && serialNumber <= this.limit) {

          res.id = serialNumber;

          this.lstEmployee.push(res);

          console.log( this.lstEmployee)



          this.serialNumberArray.push(serialNumber);

        }

      });*/



    });

  }
  addemployee(){
    
    this.dataservice.addemployee(this.addEmployeeForm.value).subscribe((res) => {
      console.log(" dataservice addemployee")
      console.log(res)
    
}
);

   }
}
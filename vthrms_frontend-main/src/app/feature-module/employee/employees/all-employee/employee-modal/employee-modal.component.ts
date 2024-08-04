import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from 'src/app/core/core.index';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  public addEmployeeForm!: FormGroup ;
  public editEmployeeForm!: FormGroup 
  

  RolesList :any;
  Designationlist: any;
  EmployeeInfo :any;
  constructor(private formBuilder: FormBuilder,public dataservice:DataService) { }

  ngOnInit(): void {

    // add employee form validation
    this.addEmployeeForm = this.formBuilder.group({
      /*FirstName: ["", [Validators.required]],*/
      first_name: ["", [Validators.required]],
      /*LastName: ["", [Validators.required]],*/
      last_name: ["", [Validators.required]],
      UserName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]],
      roleId: ["", [Validators.required]],
      designationID: ["", [Validators.required]],
      email: ["", [Validators.required]],
      /*PhoneNumber: ["", [Validators.required]],*/
      phone: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      CompanyName: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
    });

    // edit form validation
    this.editEmployeeForm = this.formBuilder.group({
     /*FirstName: ["", [Validators.required]],*/
     first_name: ["", [Validators.required]],
     /*LastName: ["", [Validators.required]],*/
     last_name: ["", [Validators.required]],
     UserName: ["", [Validators.required]],
     password: ["", [Validators.required]],
     ConfirmPassword: ["", [Validators.required]],
     roleId: ["", [Validators.required]],
     designationID: ["", [Validators.required]],
     email: ["", [Validators.required]],
     /*PhoneNumber: ["", [Validators.required]],*/
     phone: ["", [Validators.required]],
     JoinDate: ["", [Validators.required]],
     CompanyName: ["", [Validators.required]],
     EmployeeID: ["", [Validators.required]],
   });

    this.dataservice.getRoles().subscribe((res) => {
      console.log(" dataservice getroles")
      console.log(res)
  
      this.RolesList = res;
  
      /*res.data.map((res: getEmployees, index: number) => {
  
        const serialNumber = index + 1;
  
        if (index >= this.skip && serialNumber <= this.limit) {
  
          res.id = serialNumber;
  
          this.lstEmployee.push(res);
  
          console.log( this.lstEmployee)
  
  
  
          this.serialNumberArray.push(serialNumber);
  
        }
  ع 
      });*/
  
  
  
    });
// here getemployeeID
this.dataservice.getemployee(2).subscribe((res) => {
  console.log(" dataservice getemployeeID")
  console.log(res)

  this.EmployeeInfo = res;});


    this.dataservice.getDesignations().subscribe((res) => {
      console.log(" dataservice getdestinations")
      console.log(res)
  
      this.Designationlist = res;
  
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
  onSubmit(): void {
    if (this.editEmployeeForm.valid) {

      console.log(this.editEmployeeForm.value);
    }
  }

  
  addemployee(){
    
    this.dataservice.addemployee(this.addEmployeeForm.value).subscribe((res) => {
      console.log(" dataservice addemployee")
      console.log(res)
    
}
);

   }
  
  }

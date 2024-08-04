import { Component, OnInit, OnDestroy } from '@angular/core';
import {UntypedFormControl,UntypedFormGroup,Validators,FormBuilder, FormGroup,} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';

interface returndata {
  message: string | null;
  status: string | null;
  loginForm: FormGroup;

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public routes = routes;
  user:any
  constructor(private router: Router,private fb: FormBuilder,private authservice:AuthService) {
    this.initForm()
  }

  navigate() {
    this.router.navigate([routes.adminDashboard]);
  }


  initForm() {
               this.authservice.getuser().subscribe(
                (response) => { this.user = response;
           
                  console.log('testfunction')
                  console.log(response)
           
           
                 },
                (error) => { console.log(error); });
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
}

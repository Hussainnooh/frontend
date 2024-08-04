import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  getdata() {
    throw new Error('Method not implemented.');
  }
  constructor(public router: Router, private http: HttpClient ) {}
  getuser() { return  this.http.get<any>(`${environment.apiUrl}/user/allEmployees`)}
}

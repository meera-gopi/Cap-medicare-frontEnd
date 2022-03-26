import { Router } from '@angular/router';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';

import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  admin !:EmployeeModel;
  isUserLogedIn =false;
  public fullName:string='';

  constructor(private api : ApiService, private router:Router) { 
    
  }

  ngOnInit(): void {
  
  this.admin=this.api.getLoggedInUser();
  this.fullName =this.admin.firstName+' '+this.admin.lastName;
  if(this.admin){
    this.isUserLogedIn=true;
  }
  }

 onClickLogin(){
   this.router.navigate(['empLogin']);
 }

 onClickLogOut(){
  this.router.navigate(['empLogout']);
}
 


}

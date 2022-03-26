import { EmployeeModel } from './../employee-dashboard/employee-dashboard.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { find, map,tap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
 
  admin !: EmployeeModel;

  constructor(private formBuilder : FormBuilder, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:[''],
      password:['']

    })
  }

  empLogin(){

    console.log(this.loginForm.value);
    const _this=this;
   

    this.api.getLoginEmp(this.loginForm.value).subscribe(admin=> {_this.admin=admin});
    console.log();
    setTimeout(() => {
      console.log(`admin received ${this.admin.firstName}`);
      if(this.admin.firstName){
        this.api.loggedInUser(this.admin);
        this.router.navigate(['empDashBoard']);
      }

      else{
        alert('Login Failed , incorrect Credentials or Contact Administrator');
      }
  }, 5000);
    


  }

  getUser():EmployeeModel{
    return this.admin;
  }

}

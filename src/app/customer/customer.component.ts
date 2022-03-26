import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from './customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  custLogin !:FormGroup;
  customerLoggedIn !:CustomerModel;

  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.custLogin = this.formBuilder.group({
      username:[''],
      password:['']
    })
  }

  customerLogin(){

    console.log(this.custLogin.value);
    const _this=this;
   

    this.api.getLoginCust(this.custLogin.value).subscribe(cust=> {
      console.log(cust.firstName);
      this.customerLoggedIn=cust});
    console.log();
    setTimeout(() => {
      console.log(`Customer received ${this.customerLoggedIn.firstName}`);
      if(this.customerLoggedIn.firstName){
        this.api.loggedInCustomer(this.customerLoggedIn);
        this.router.navigate(['customer']);
      }

      else{
        alert('Login Failed , incorrect Credentials or Contact Administrator');
      }
  }, 5000);
  

}

}

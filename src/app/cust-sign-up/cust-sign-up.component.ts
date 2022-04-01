import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cust-sign-up',
  templateUrl: './cust-sign-up.component.html',
  styleUrls: ['./cust-sign-up.component.css']
})
export class CustSignUpComponent implements OnInit {

  public signUpForm !: FormGroup;
  private custurl = 'http://ec2-54-147-240-145.compute-1.amazonaws.com:8090/medicare';
  constructor(private formBuilder : FormBuilder , private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phoneNumber:[],
      username:[''],
      password:[''],
      address:['']
    })
  }

  signUp(){

    console.log(this.signUpForm.value);

    this.http.post<any>(`${this.custurl}`+`/saveInfo`,this.signUpForm.value)
    .subscribe(res=>{
      alert('Signed up successfully');
      this.signUpForm.reset();
      this.router.navigate(['custLogin']);
    }, err=>{
      alert('Something went wrong');
    })

  }

}

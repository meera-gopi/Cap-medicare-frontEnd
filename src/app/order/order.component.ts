import { ApiService } from './../shared/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../customer/customer.model';
import { IOrder } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  custLogedIn !:CustomerModel;
  isUserLogedIn =false;
  public fullName:string='';
  orderList !: IOrder[];

  constructor(private router:Router, private api:ApiService) {this.custLogedIn=this.api.getLoggedInCustomer();
    this.fullName =this.custLogedIn.firstName+' '+this.custLogedIn.lastName;
    if(this.custLogedIn){
      this.isUserLogedIn=true;
    } }

  ngOnInit(): void {
    this.custLogedIn=this.api.getLoggedInCustomer();
    console.log(this.custLogedIn);
   this.fullName =this.custLogedIn.firstName+' '+this.custLogedIn.lastName;
   if(this.custLogedIn){
     this.isUserLogedIn=true; 
   }

   setTimeout(()=>{this.getAllOrders()},5000);

  }


  onClickLogOut(){
    this.router.navigate(['empLogout']);
  }

  getAllOrders(){
    this.api.getAllCustomerOrders(this.custLogedIn.id).subscribe(val=>{
      this.orderList=val;
    })
  }

}

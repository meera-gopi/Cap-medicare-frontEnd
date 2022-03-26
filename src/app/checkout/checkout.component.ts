import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from '../customer/customer.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  custLogedIn !:CustomerModel;
  isUserLogedIn =false;
  public fullName:string='';
  public grandTotal:number=0;
  public payment=false;

  constructor(private api : ApiService, private router:Router) { }

  ngOnInit(): void {
    this.custLogedIn=this.api.getLoggedInCustomer();
  this.fullName =this.custLogedIn.firstName+' '+this.custLogedIn.lastName;
  if(this.custLogedIn){
    this.isUserLogedIn=true;
  }
  this.grandTotal=this.api.sendTotaltoCheckOut();
  }

  clickOnCustomer(){
    this.router.navigate(['customer']);
  }
  clickOnLogOut(){
    this.router.navigate([''])
  }

  setPayment(){
    this.payment=true;
    this.api.updatePaymentStatus().subscribe((response:any)=>{
      if (response.status==200){
        'Order Completed'
      }
    })
  }

}

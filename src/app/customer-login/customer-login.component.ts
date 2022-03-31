import { CartComponent } from './../cart/cart.component';
import { IProduct } from './../product-dashboard/product-dashboard.model';
import { IOrdItemsSave } from './../cart/cart.order.item.model';
import { IOrdSent } from './../cart/cart.order.model';
import { CustomerModel } from './../customer/customer.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import {DatePipe, formatDate, getLocaleDateFormat, NgPluralCase} from '@angular/common';
import { __assign } from 'tslib';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  custLogedIn !:CustomerModel;
  isUserLogedIn =false;
  public fullName:string='';
  productsList !:IProduct[];
  public order_id:number=0;
  public badge:number=0;
  public searchText:string="";
  public searchTerm:string='';
  public cartWrap={
    arg1:0,
    arg2:0

  };
  
  orderToSend: IOrdSent = new IOrdSent;
  cartItems :IOrdItemsSave= new IOrdItemsSave;
  datepipe: DatePipe = new DatePipe('en-US')
  formattedDate :Date=new Date(Date.now());
  
  constructor(private api : ApiService, private router:Router) { }

  ngOnInit(): void {
   this.custLogedIn=this.api.getLoggedInCustomer();
   console.log(this.custLogedIn);
  this.fullName =this.custLogedIn.firstName+' '+this.custLogedIn.lastName;
  if(this.custLogedIn){
    this.isUserLogedIn=true; 
  }

  setTimeout(()=>{
    this.getAllProducts()
  },1000);

  this.badge=0;

  }

  //Search

  search(event :any){
    this.searchTerm=(event.target as HTMLInputElement).value;
   // this.api.search.next(this.searchText);
     }

//Logout Feature
  onClickLogOut(){
   this.router.navigate(['empLogout']);
 }
//Getting product List
 getAllProducts(){
  this.api.getAllProducts().subscribe(products=>{
    this.productsList=products;  
  }) 
  }

  //Add to cart
 
  addToCart(id:number,prdId:number){

    console.log(prdId);
    this.cartItems.productId=prdId;
    this.cartItems.quantity=1;
    
    if(!this.order_id ){
      
     this.orderToSend.statusId=3;
     this.orderToSend.customerId=id;
     this.orderToSend.orderDate=formatDate(Date.now(),'dd-MM-yyyy','en_US');
     this.api.saveOrder(this.orderToSend).subscribe(val=>{
       this.order_id=val;
       this.cartItems.orderId=val;
       console.log(`entered ${val} and ${this.order_id}`)
       //this.cartItems.orderId=this.order_id;
       console.log(val,this.order_id);
     });

     
    setTimeout(()=>{
     
     this.cartItems.orderId=this.order_id;
     console.log(`items to save in order items`);
     console.log(this.cartItems);
    },5000); 

     setTimeout(()=>{
     this.addItem(this.cartItems); },5000);   
    }

    else{  
      setTimeout(()=>{ 
      this.addItem(this.cartItems);  },5000);    
    }
    this.badge=this.badge+1;
  }

//http call for adding item
  addItem(items:IOrdItemsSave){
    this.api.addItems(items).subscribe((response:any)=>{
      if(response.status===200){
        
      }
      else{
        alert("Some error occurred");
      }
    });
  }

  //save badge in api

  sendBadgeAndOrder(){
    this.cartWrap.arg1=this.order_id;
    this.cartWrap.arg2=this.badge;
    this.api.getBadgeForCart(this.cartWrap);
    this.router.navigate(['cart']);
  }

  //set badge to zero  on first
  getBadgeAndOrder(){
    return this.cartWrap;
  }

  //

}


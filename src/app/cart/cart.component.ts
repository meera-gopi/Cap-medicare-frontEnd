import { ICartItems } from './cart.items.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from '../customer/customer.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  custLogedIn !:CustomerModel;
  isUserLogedIn =false;
  public fullName:string='';
  public cartOrderId :number=0;
  public cartBadge:number=0;
  itemList !:ICartItems[];
  public grandTotal:number=0;


  constructor(private api : ApiService, private router:Router
    ) { }

  ngOnInit(): void {
    this.custLogedIn=this.api.getLoggedInCustomer();
  this.fullName =this.custLogedIn.firstName+' '+this.custLogedIn.lastName;
  if(this.custLogedIn){
    this.isUserLogedIn=true;
  }
  this.cartBadge=this.api.serveBadge();
  this.cartOrderId=this.api.serveOrder();
  console.log(this.cartBadge);
  console.log(this.cartOrderId);

  setTimeout(()=>{
    this.getCartItems()
  },1000);
  }

  onClickLogOut(){
    this.router.navigate(['empLogout']);
    
  }

  //get the cart items
getCartItems(){
  this.api.getCartItems(this.cartOrderId).subscribe(items=>{
    this.itemList=items;
    for (let k of this.itemList) {
      this.grandTotal += k.total_item_cost;
    }

  })
}

//delete cart items

deleteItem(itmid:number){
  this.api.deleteItem(itmid).subscribe((response:any)=>{
    if(response.status != 200){
      alert('Failed to remove item');
    }
  })

  setTimeout(()=>{
    this.getCartItems()
  },500);
}

// send total

setAmount(){
  this.api.getGranTotal(this.grandTotal);
}



 
}

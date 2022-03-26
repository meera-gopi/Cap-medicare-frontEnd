import { ICartItems } from './../cart/cart.items.model';
import { IOrdItemsSave } from './../cart/cart.order.item.model';
import { IOrdSent } from './../cart/cart.order.model';

import { LoginComponent } from './../login/login.component';
import { EmployeeModel } from './../employee-dashboard/employee-dashboard.model';

import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import {BehaviorSubject, ConnectableObservable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginCredEmp } from '../interfaces/login.model';
import { IProduct } from '../product-dashboard/product-dashboard.model';
import { CustomerModel } from '../customer/customer.model';
import { IOrder } from '../order/order.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url for REST Api
   private productPost: string='http://localhost:8090/product';
   baseURL='http://localhost:8090';
  
//Component Data transfer Login to Employee Dashboard

   $isLoggedIn = new EventEmitter();
   admin !: EmployeeModel;
   customerLoged !:CustomerModel;
   cartBadge :number=0;
   currentCartOrderId:number=0;
   totalAmount:number=0;
   public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient,private router:Router) { }

// HTTSERVICES-Product
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseURL}/product/prouctList`);
 }
//Post Product
 postProduct(data: IProduct){
   const v1:any = this.http.post(`${this.productPost}/addProduct`,data,{observe:"response",responseType:"text"});
   console.log(v1);
   return v1;
   //return this.http.post<IProduct>(`${this.productPost}/addProduct`,data);
   }
//delete Product

deleteProduct(id:number){
  return this.http.delete(`${this.productPost}/removeProduct/${id}`,{observe:"response",responseType:"text"});
}

//update Product Status
updateProductStatus(id:number,stat:boolean){
  return this.http.put(`${this.productPost}/updateProductStatus/${id}/${stat}`,{observe:"response",responseType:"text"});
}

//update Product
updateProductInfo(data:IProduct){
  return this.http.put(`${this.productPost}/updateProductInfo`,data,{observe:"response",responseType:"text"});
}

//HTTP Services - Employee
  getLoginEmp(cred : LoginCredEmp):Observable<EmployeeModel>{
    console.log(cred);
    const v1:any =this.http.post<EmployeeModel>(`${this.baseURL}/employee/login`,cred);
    console.log(v1);
    
    return v1;
  }

  // Emitter Service - to Employee Dash Board

  loggedInUser(loggedIn:EmployeeModel){
    this.admin = loggedIn;
    //this.$isLoggedIn.emit(this.admin);
  }

  getLoggedInUser():EmployeeModel{
    return this.admin;
  }

  //CustomerAuth

  getLoginCust(cred : {username:string,password:string}):Observable<CustomerModel>{
    console.log(cred);
    const v1:any =this.http.post<CustomerModel>(`${this.baseURL}/customer/login`,cred);
    console.log(v1);
    
    return v1;
  }

  loggedInCustomer(loggedIn:CustomerModel){
    this.customerLoged = loggedIn;
    //this.$isLoggedIn.emit(this.admin);
  }

  getLoggedInCustomer():CustomerModel{
    return this.customerLoged;
  }
  
//Save Order on first add to cart
saveOrder(ord:IOrdSent):Observable<number>{

  return this.http.post<number>(`${this.baseURL}/orders/saveOrder`,ord);

}
//Add cart to item

addItems(item:IOrdItemsSave){

  return this.http.post(`${this.baseURL}/orders/addItem`,item,{observe:"response",responseType:"text"})

}

//Get Cart items

getCartItems(orderId:number):Observable<ICartItems[]>{
  return this.http.get<ICartItems[]>(`${this.baseURL}/orders/itemList/${orderId}`);
}

//Delete Cart Item
deleteItem(id:number){
  return this.http.delete(`${this.baseURL}/orders/removeItem/${id}`,{observe:"response",responseType:"text"});
}

//set cart length for checkout



//getBadge

getBadgeForCart(cartdata:{arg1:number,arg2:number}){
  this.cartBadge=cartdata.arg2;
  this.currentCartOrderId=cartdata.arg1;
} 

//send badge n order
serveBadge(){
  return this.cartBadge;
}

serveOrder(){
  return this.currentCartOrderId;
}
//Check Out Services

getGranTotal(amount:number){
this.totalAmount=amount;
}

//send grand Total

sendTotaltoCheckOut(){
  return this.totalAmount;
}

//Update Payment status

updatePaymentStatus(){
  return this.http.put(`${this.baseURL}/orders/paid/${this.currentCartOrderId}`,{observe:"response",responseType:"text"});

}

//Get all ordes for custoer

getAllCustomerOrders(id:number):Observable<IOrder[]>{

  return this.http.get<IOrder[]>(`${this.baseURL}/orders/allOrders/${id}`);

}

}
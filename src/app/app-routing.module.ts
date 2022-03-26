import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { CustSignUpComponent } from './cust-sign-up/cust-sign-up.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';


const routes: Routes = [
  {path:'',component:HeaderComponent},

  {path:'empLogin',component:LoginComponent},
  {path:'custLogin',component:CustomerComponent},
  {path:'empDashBoard',component:EmployeeDashboardComponent},
  {path:'product',component:ProductDashboardComponent},
  {path:'newCustomer',component:CustSignUpComponent},
  {path:'empLogout',redirectTo:'',pathMatch:'full'},
  {path:'customer',component:CustomerLoginComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'orderList',component:OrderComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

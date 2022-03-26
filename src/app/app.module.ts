import { ApiService } from './shared/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { OrderComponent } from './order/order.component';
import { ItemsComponent } from './items/items.component';
import { CustomerComponent } from './customer/customer.component';
import { CustSignUpComponent } from './cust-sign-up/cust-sign-up.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    ProductDashboardComponent,
    LoginComponent,
    HeaderComponent,
    OrderComponent,
    ItemsComponent,
    CustomerComponent,
    CustSignUpComponent,
    CustomerLoginComponent,
    CartComponent,
    CheckoutComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }

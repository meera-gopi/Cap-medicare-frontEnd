import { Observable } from 'rxjs';
import { IProduct } from './product-dashboard.model';
import { EmployeeModel } from './../employee-dashboard/employee-dashboard.model';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {
  
  admin !:EmployeeModel;
  public fullName:string='';
  isUserLogedIn =false;
  formValue !:FormGroup;
  ack !:any;
  productsList !:IProduct[];
  productToUpdate !: IProduct;
  id_prd_to_update:number=0;
  constructor(private formBuilder: FormBuilder, private api : ApiService,private router :Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      productName:[''],
      price:[],
      sellerName:[''],
      description:[''],
      productCategoryId:[],
      active:[]

    })

    this.admin=this.api.getLoggedInUser();
    this.fullName =this.admin.firstName+' '+this.admin.lastName;

    if(this.admin){
      this.isUserLogedIn =true;
    }

    this.getAllProducts();


  }

  onClickProfile(){

    this.router.navigate(['empDashBoard']);

  }

  onClickLogOut(){
    this.router.navigate(['empLogout']);
  }
//Post Product
  addProduct():void{
    console.log(this.formValue.value);
    this.api.postProduct(this.formValue.value).subscribe((response: { status: any; })=>{
      
      if(response.status===200)
      {
        alert("Product Saved Successfully");
        let btref=document.getElementById("cancel");
        btref?.click();
        this.reset();
      }
      else{
        alert("Error Saving Product");
      }
      console.log(response);

    }
      )
  }

//Get Products

getAllProducts(){

this.api.getAllProducts().subscribe(products=>{

  this.productsList=products;

}) 
}
//Delete Product
deleteProduct(id:number){
this.api.deleteProduct(id).subscribe((response:any)=>{
  console.log(response);
  if(response.status===200){
    alert('The Product is removed');
    this.getAllProducts();

  }
  else{
    alert('Unable to remove product');
  }
}

)
}
//Update Product Status
updateProductStatus(id:number,stat:boolean){
  return this.api.updateProductStatus(id,stat).subscribe((response:any)=>{
    console.log(response);
    if(response.status===200){
      alert('Product status updated');
      this.getAllProducts();
    }
    else{
      alert('Unable to update product status');

    }
  })
}

//Update Product
// price:[],
//       sellerName:[''],
//       description:[''],
//       productCategoryId:[],
//       active:
editProduct(prd:IProduct){
  console.log(prd);
  this.id_prd_to_update=prd.prodId;
  this.formValue.controls['productName'].setValue(prd.productName);
  this.formValue.controls['price'].setValue(prd.price);
  this.formValue.controls['sellerName'].setValue(prd.sellerName);
  this.formValue.controls['description'].setValue(prd.description);
  this.formValue.controls['productCategoryId'].setValue(prd.category.prodCategoryId);
  this.formValue.controls['active'].setValue(prd.active);
  console.log(this.id_prd_to_update);

}
updateProduct(){
  console.log(this.id_prd_to_update);
  this.productToUpdate=this.formValue.value;
  this.productToUpdate.prodId=this.id_prd_to_update;
  console.log(this.productToUpdate);
setTimeout(()=>{this.api.updateProductInfo(this.productToUpdate,this.id_prd_to_update).subscribe((response:any)=>{

  console.log(response);
  if(response.status===200){
    alert('product info updated');
    let btref=document.getElementById("cancel");
      btref?.click();
      this.reset();

  }
  else{
    alert('unable to update product info');
  }

})},1500)
  

}

  reset(){
    this.formValue.reset();
    
  }
  // this.productToUpdate.productName=this.formValue.value.productName;
  // this.productToUpdate.price=this.formValue.value.price;
  // this.productToUpdate.sellerName=this.formValue.value.sellerName;
  // this.productToUpdate.description=this.formValue.value.description;
  // this.productToUpdate.productName=this.formValue.value.productName;
  // this.productToUpdate.productName=this.formValue.value.productName;
  

}

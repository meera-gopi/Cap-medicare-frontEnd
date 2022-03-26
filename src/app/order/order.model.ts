import { IProduct } from './../product-dashboard/product-dashboard.model';
import { CustomerModel } from './../customer/customer.model';

class IOrderStatus {
orderStatusId : number=0;
description : string='';

}

class IOrdItems {
    itemId:number=0;
    quantity : number=0;
    total_item_cost:number=0;
    product !:IProduct;

}

export class IOrder{
orderId:number=0;
orderDate:string='';
orderItems !:IOrdItems;
status !:IOrderStatus;
customer !:CustomerModel;
}
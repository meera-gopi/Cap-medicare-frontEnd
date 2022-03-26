import { IProduct } from "../product-dashboard/product-dashboard.model";

export class ICartItems {
    itemId:number=0;
    quantity : number=0;
    total_item_cost:number=0;
    product !:IProduct;

}
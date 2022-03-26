
class ICategory{
    prodCategoryId:number=0;
    description?:string='';
}


export class IProduct{
    prodId:number=0;
    productName:string = '';
    price:number=0;
    sellerName:string ='';
    description:string ='';
    category!:ICategory;
    active:boolean=false;
    
}




// export class IProduct{
//     prodId:number=0;
//     productName:string = '';
//     price:number=0;
//     sellerName:string ='';
//     description:string ='';
//     productCategoryId:number =0;
//     active:boolean=false;
    
// }

//long id, String productName, BigDecimal price, String sellerName, String description,
//long productCategoryId
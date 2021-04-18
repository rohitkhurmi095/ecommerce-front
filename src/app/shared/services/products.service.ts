import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';

//Product Type
import {Product} from '../classes/product';

import { Global } from '../global';
import 'rxjs/add/operator/map';


//============================
// METHODS
//----------------------------
//get all products
//gets products by category
//get compare products
//Add to compare
//Remove from compare
//============================

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //------------------------------------------------------------------------
  currency:string = "INR";
  
  //Anything added to compare -> kept in localStorage (as string)
  //get products from commpare (in localStorage) as object -> JSON.parse()
  products = JSON.parse(localStorage.getItem("compareItem") || '{}') || [];
  //------------------------------------------------------------------------

  //Dependency Resolution
  constructor(private dataService:DataService, private toastr:ToastrService) { }


  //------------------------------------------------------
  //CALL ALL PRODUCTS API:(ProductMaster/GetProductList)
  //------------------------------------------------------
  //allProdducts()
  private allProducts():Observable<Product[]>{
    let data = this.dataService.get(Global.BASE_APT_PATH + "ProductMaster/GetProductList");
    return data;
  }

  //===================
  // GET ALL PRODUCTS
  //==================
  //type:Products[]
  getProducts(){
    return this.allProducts();
  }


  
  //===================
  // GET PRODUCT by Id
  //===================
  //type: Product (single product)
  getProduct(id:number):Observable<Product | undefined>{
    
    //find product with matching id from allProducts()
    return this.allProducts().map(items => items.find(item => item.id === id));
  }

  
  
  //==========================
  // GET PRODUCTs by Category
  //==========================
  //product -> cartegory
  //if category = all (dont filter)
  //if category = catg(passed as filter) => filter by category
  getProductsByCategory(catg:string):Observable<Product[]>{
    return this.allProducts().map((items: any[]) => items.filter((item:Product)=>{
      if(catg === "all"){
        //Dont Filter
        return true;
      }else{
        //filter products by category
        //return product->category
        return item.category === catg;
      }
    }));
  }


  //==========================
  //GET COMPARE PRODUCTS
  //==========================
  getCompareProducts():Observable<Product[]>{
    return of(this.products);
  }


  //==========================
  // ADD TO COMPARE
  //==========================
  //compareItem = set in localStorage
  // we only compare 4 products at a time

  //------------------------------------------------------
  // Check if item(product) is already present in compare
  //------------------------------------------------------
  hasProducts(product:Product){
    let item = this.products.find((item:Product) => item.id === product.id);
    //if item found -> return item (!undefined -> true)
    //else return undefined (false)
    return item !== undefined;
  }

  //------------------------------------------------------
  //IF ITEM IS NOT PRESENT in compare -> ADD to Compare
  //------------------------------------------------------
  // we only compare 4 products at a time
  addToCompare(product:Product){
    if(!this.hasProducts(product)){
      if(this.products.length<4){
        //add product -> products[]
        this.products.push(product);

        //update compare -> localStorage
        localStorage.setItem("cartItem", JSON.stringify(this.products));
        
        //toastr success notification
        this.toastr.success("This product successfully added to compare list!!", "Compare");
      }else{
        this.toastr.error("you can add maximum 4 products are in compare list", "Compare");
      }
    }else{
      this.toastr.error("This product already added to compare list", "Compare");
    }
  }
  



  //===========================
  // REMOVE FROM COMPARE
  //===========================
  removeFromCompare(product:Product){

    //if there is no product to remove
    //product = undefined
    if(product === undefined){
      return false;
    }

    //if there is product to remove
    //find the index of product using arr.indexOf() (arr = products[])
    //remove product from that index using arr.splice(index,1) (arr = products[])
    let index = this.products.indexOf(product);
    this.products.splice(index,1);

    //update compare (localStorage)
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }

}

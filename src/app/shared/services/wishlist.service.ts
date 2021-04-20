import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';

//cartItem TYPE
import {cartItem} from '../classes/cart-item';
//Product Type
import {Product} from '../classes/product';


//============================ 
// METHODS
//----------------------------
//get wishlist items
//Add product to wishlist
//Remove product from wishlist
//============================

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  //------------------------------------------------------------------------
  //Anything added to wishList -> kept in localStorage (as string)
  //get products from wishlistDetails (in localStorage) as object -> JSON.parse()
  products = JSON.parse(localStorage.getItem("wishlistItem")) || [];

  //------------------------------------------------------------------------


  //toastr notification service
  constructor(private toastr:ToastrService) { }


  //=====================
  // GET Wishlist Items 
  //=====================
  //of -> return data as observable type

  getWishlistItems():Observable<Product[]>{
    return of(this.products);
  }



  //==========================
  // ADD product TO WISHLIST
  //==========================

  //--------------------------------------------
  //CHECK IF ITEM IS ALREADY ADDED IN WISHLIST
  //--------------------------------------------
  hasProducts(item:Product):boolean{
    
    //find item with same id as products->item(product)
    //(products -> prod.id) === item.id
    //if item found -> return item (!undefined -> true)
    //else return undefined (false)
    let product = this.products.find((prod:Product)=> prod.id === item.id); 
    return product !== undefined
  }

  //IF ITEM IS NOT PRESENT IN WISHLIST -> ADD TO WISHLIST
  //------------------------------------------------------
  addToWishlist(item:Product){

    //if product is not present in wishlist
    if(!this.hasProducts(item)){

      //add product -> products[]
      this.products.push(item);

      //update product -> wishlist (localStorage)
      localStorage.setItem("wishlistItem",JSON.stringify(this.products));

      //toastr notification
      this.toastr.success("This product successfully added to wishlist !!", "Wishlist");

    }else{
    //if product is already present in wishlist
    //toastr notification
      this.toastr.error("This product already added to wishlist", "Wishlist");
    }
  }



  //===============================
  // REMOVE product FROM WISHLIST
  //===============================
  //splice()
  //----------
  //Array.splice(index, removeCount, itemList)
  /* var fruits = ["Banana", "Orange", "Apple", "Mango"];
      fruits.splice(2, 0, "Lemon", "Kiwi");  //Banana,Orange,Lemon,Kiwi,Apple,Mango
      fruits.splice(2, 1, "Lemon", "Kiwi");  //Banana,Orange,Lemon,Kiwi,Mango */
  //__________
  //indexOf()
  //-----------
  /*The indexOf() method returns the position of the first occurrence of a specified value in a string.
    index starts from 0,1 .....
    This method returns -1 if the value to search for never occurs.
    If you want to search from end to start, use the lastIndexOf() method
    Example:
      var fruits = ["Banana", "Orange", "Apple", "Mango"];
      var a = fruits.indexOf("Apple"); //2  */
  //___________

  removeFromWishlist(item:Product){

    //if there is no product to remove
    //---------------------------------
    //if product is undefined
    if(item === undefined){
      return false;
    }

    //if product is there in wishlist
    //---------------------------------
    //find index of product from products[]
    //remove product from that index using splice()
    let index = this.products.indexOf(item);
    this.products.splice(index,1);

    //Update wishlist (localStorage)
    localStorage.setItem("wishlistItem", JSON.stringify(this.products));
  }


}

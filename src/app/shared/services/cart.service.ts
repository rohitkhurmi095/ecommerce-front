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
//get cart items
//calculate Total Amount
//calculate stock counts
//Add to cart
//Remove from cart
//clear all cartItems
//============================

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getItems() {
    throw new Error('Method not implemented.');
  }

  //------------------------------------------------------------------------
  //Anything added to cart -> kept in localStorage (as string)
  //get products from cartDetails (in localStorage) as object -> JSON.parse()
  products = JSON.parse(localStorage.getItem("cartItem")) || [];
  
  //CART_ITEM: behaviour subject of type cartItem : [] initially
  //change in 1 component -> gets updated in all components
  cartItems: BehaviorSubject<cartItem[]> = new BehaviorSubject<cartItem[]>([]);
  //------------------------------------------------------------------------

  //toastr notification
  constructor(private toastr:ToastrService) { }


  //====================
  // GET ITEM FROM CART
  //====================
  //of -> to return data as Observable type
  //get cartItem from localStorage as Observable

  getCartItems():Observable<cartItem[]>{
    return of(this.products);
  }




  //=====================
  // GET TOTAL AMOUNT for each item
  //=====================
  //The map() method is used for creating a new array from an existing one, applying a function to each one of the elements of the first array.
  //The reduce() method reduces the array to a single value (also give default value)
  //map on BehaviourSubject
  //reduct on product (from localStorage)
  //total Amount = price * quantity
  //price -> cartItem.product.price (cart model -> product model)
  //quantity -> cartModel

  getTotalAmount():Observable<number>{
    return this.cartItems.map(()=>{
      return this.products.reduce((total:number, item:cartItem)=>{
        return total +(item.product?.price * item.quantity);
      },0);
    });
  }




  //====================
  // ADD ITEM TO CART
  //====================
  //add product:Product (cartItem.product)
  //increase quantity(cartItem.quantity)
  //products = all cartItems from localStorage

  addToCart(product:Product, quantity:number): cartItem | boolean {
    
    //item
    let item:cartItem | boolean = false;
    
    //--------------------------------------------------------
    // if PRODUCT Already EXISTS in cart -> increase quantity
    //---------------------------------------------------------
    //FIND product from products (all cartItems) using index
    //cartItem.product.id = product.id

    let hasItem = this.products.find((item:cartItem, index:number)=>{

      if(item.product.id == product.id){

        //console.log(this.products);
        //console.log(this.products[index]);
        //console.log(this.products[index].quantity);
        
        //update quantity (Add new quantity to old quantity value)
        let qty:number = this.products[index].quantity + quantity;
        //calculate stocks
        let stock = this.calculateStockCounts(this.products[index],quantity);

        //if quantity!= 0 & stock is there
        if(qty!=0 && stock){
          //updated quantity
          this.products[index]['quantity'] = qty;

          //Add to cart (localStorage)
          localStorage.setItem("cartItem",JSON.stringify(this.products));

          //toastr notification
          this.toastr.success("This product successfully added to cart !!", "Cart");
        }
        return true;
      }
      return false;
    });

  
    //--------------------------------------------------
    //if PRODUCT DOES NOT EXISTS in cart -> ADD to cart
    //---------------------------------------------------
    if(!hasItem){

      //item (obj) to be added to cart with updated quantity
      //current quantity = 0 
      //updated quantity = current quantity + 1 (minimum 1 quantity)
      item = {
        product: product,
        quantity: quantity + 1
      }

      //ADD NEWLY ADDED ITEM -> PRODUCTS[] (all cart items)
      this.products.push(item);

      //Add item -> cart (localStorage)
      localStorage.setItem("cartItem", JSON.stringify(this.products));

      //toastr notificaiton
      this.toastr.success("This product successfully added to cart !!", "Cart");
    }
    return true;

  }




  //======================
  // UPDATE CART QUANTITY
  //======================
  //update product:Product (cartItem.product)
  //increase quantity(cartItem.quantity)
  //products = all cartItems from localStorage

  updateCartQuantity(product:Product, quantity:number): cartItem | boolean {
    
    //FIND product from products (all cartItems) using index
    //cartItem.product.id = product.id

    return this.products.find((item:cartItem, index:number)=>{

      if(item.product.id == product.id){
        
        //update quantity (Add new quantity to old quantity value)
        let qty:number = this.products[index].quantity + quantity;
        //calculate stocks
        let stock = this.calculateStockCounts(this.products[index],quantity);

        //if quantity!= 0 & stock is there
        if(qty!=0 && stock){
          //updated quantity
          this.products[index]['quantity'] = qty;

          //Add to cart (localStorage)
          localStorage.setItem("cartItem",JSON.stringify(this.products));

          //toastr notification
          this.toastr.info("Product quantity Updated in cart !!", "Cart");
        }
        return true;
      }
      return false;
    });
  }



  //=========================
  // CALCULATE STOCK COUNTS
  //=========================
  //quantity = cartItem.quantity
  //stock = cartItem.product.stock 

  calculateStockCounts(item:cartItem, quantity:number){
    let qty = item.quantity + quantity;
    let stock = item.product.stock;

    //if quantity > stock 
    if(stock < qty){
      //toastr notification
      this.toastr.error("You cannot add more item in cart !!", "Cart");
      return false;
    }
    return true;
  }

  

  //========================
  // REMOVE ITEM FROM CART
  //========================
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
  
  removeFromCart(item:cartItem){
   
    //If there is no product to remove
    //---------------------------------
    //if product is undefined
    if(item === undefined){
      return false;
    }

    //If there is product to remove
    //---------------------------------
    //find index of product from products[] 
    //& remove that product from the index using splice() method

    let index = this.products.indexOf(item);
    this.products.splice(index,1);

    //update cart (localStorage)
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }


  
  //===========================
  // CLEAR ALL ITEMs FROM CART
  //===========================
  //Array.splice(index, removeCount, itemList)

  clearAllItemsFromCart(){
    
    //splice() from cart till all product's of products[]
    //start from index 0 -> till products.length
    this.products.splice(0,this.products.length);

    //update cart (localStorage)
    localStorage.setItem("cartItem", JSON.stringify(this.products));
  }

}

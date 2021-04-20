import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/shared/classes/cart-item';
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //cartItems(Products) 
  shoppingCartItems:any[] = [];


  //cartService,productService
  constructor(private cartService:CartService,public productService:ProductsService) { }

  ngOnInit(): void {
    
    //===========================
    // GET CART ITEMS (Products)
    //===========================
    this.cartService.getCartItems().subscribe(res=>{
      this.shoppingCartItems = res;

      //console.log('Cart Items: ',res);
      //-----------------
      //CART ITEMS[]
      //[{product: {…}, quantity: 2}, {product: {…}, quantity: 2}]
      //-----------------
      //SINGLE PRODUCT 
      /*
        category: "women"
        colors: []
        description: "Description"
        discount: 50
        id: 11
        isNew: 1
        isSale: 1
        name: "Overlap Dresss"
        pictures: (5) [
          "http://www.sahosoftweb.com/Images/11.jpg", 
          "http://www.sahosoftweb.com/Images/12.jpg", 
          "http://www.sahosoftweb.com/Images/13.jpg", 
          "http://www.sahosoftweb.com/Images/14.jpg", 
          "http://www.sahosoftweb.com/Images/15.jpg"
        ]
        price: 250
        salePrice: 400
        shortDetails: "Short Details"
        size: []
        stock: 100
        tags: ["Nike"]
        variants: []
      */
    });

  }


  //======================
  // CART SERVICE METHODS
  //======================

  //GET TOTAL AMOUNT
  //-----------------
  //To return observable data on html (use 'async pipe')
  getTotal():Observable<number>{
    return this.cartService.getTotalAmount();
  }

  //INCREMENT QUANTITY
  //-------------------
  increment(product:Product, quantity:number = 1){
    this.cartService.updateCartQuantity(product,quantity);
  }
  //DECREMENT QUANTITY
  //-------------------
  decrement(product:Product, quantity:number = -1){
    this.cartService.updateCartQuantity(product,quantity);
  }

  //REMOVE FROM CART
  //-----------------
  removeItem(item:cartItem){
    this.cartService.removeFromCart(item);
  }

}

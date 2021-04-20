import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  //wishlistItems
  wishlistItems:any[] = [];

  //wishlist,product service, cartService
  constructor(private wishlistService:WishlistService, public productService:ProductsService, private cartService:CartService) { }

  ngOnInit(): void {
    //======================
    //GET wishlist products
    //======================
    this.wishlistService.getWishlistItems().subscribe(res=>{
      this.wishlistItems = res;
    });

    //console.log('Wishlist Items: ',this.wishlistItems);
    /*[ 
        0: {id: 11, name: "Overlap Dresss", price: 250, salePrice: 400, discount: 50, …}
        1: {id: 10, name: "Sleeveless dress", price: 900, salePrice: 950, discount: 50, …}
      ]
    */
  }

  //==========================
  // WISHLIST SERVICE METHODS
  //==========================
  //ADD product to cart 
  //------------------------
  addToCart(product:Product, quantity:number = 1){
    this.cartService.addToCart(product, quantity);
    //when item is added to cart -> remove it from wishlist
    this.wishlistService.removeFromWishlist(product);
  }

  //REMOVE product from wishlist
  //-----------------------------
  removeFromWishlist(product:Product){
    this.wishlistService.removeFromWishlist(product);
  }

}

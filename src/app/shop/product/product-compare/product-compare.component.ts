import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.scss']
})
export class ProductCompareComponent implements OnInit {

  //products
  products:any[] = [];
  
  //productService, cartService
  constructor(public productService:ProductsService, private cartService:CartService) { }

  ngOnInit(): void {
    //=======================
    // GET COMPARE PRODUCTS
    //=======================
    this.productService.getCompareProducts().subscribe(res=>{
      this.products = res;

      //console.log('Products: ',this.products.length);
    });
  }


  //=========================
  // PRODUCT SERVICE METHODS
  //=========================
  // Add to cart
  //-------------------------
  addToCart(product:Product, quantity:number = 1){
    this.cartService.addToCart(product,quantity);
  }

  // Remove from compare
  //--------------------------
  removeFromCompare(product:Product){
    this.productService.removeFromCompare(product);
  }

}

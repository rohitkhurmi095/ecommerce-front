import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  //---- PRODUCTS------
  //all products
  products:any[];
  //---- PRODUCT------
  //single product{}(by id)
  product: any = {};

  //---- COUNTER(quantity)------
  //default quantity = 1
  counter:number = 1; 
  
  //---- SELECTED SIZE -----
  //size selector
  selectedSize:any = '';


  //======================--------
  // PRODUCT IMAGE SLIDER config
  //======================--------
  //slider 1 (single product (class="product-slick"))
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
    fade:true
  };

  //Slider 2 (different products)
  slideNavConfig = {
    vertical:false,
    slidesToShow:3,
    slidesToScroll:1,
    asNavFor: '.product-slick', //navigate for slider1 (with class="product-slick")
    arrows:false,
    dots:false,
    focusOnSelect:true
  }
  //---------------------

  //product service, activatedRoute
  constructor(public productService:ProductsService, private wishlistService:WishlistService,private cartService:CartService, private route:ActivatedRoute, private router:Router) {

    //_____________________________________________________
    // GET SINGLE PRODUCT (by id received from the route)
    //====================================================================================
    //when we click on product image  -> GOTO ->'/home/left-sidebar/product/:proudctId
    //receive single product id using this route (via activated route)
    //find single product by using this id (productId) using product service
    //NOTE: we passed as normal params (Not query params)
    //=====================================================================================
    this.route.params.subscribe(params=>{
      //productId (received as string -> convertTo number using parseInt(productId))
      let id = params['id']; 
      
      //productId (as number)
      //console.log(parseInt(id));

      //----------------------------------
      //Find single product using this id (via productService)
      //----------------------------------
      this.productService.getProduct(parseInt(id)).subscribe(res=>{
        //single product
        this.product = res;
        
        //console.log('PRODUCT: ',this.product);
      });
    });
    //-----------------------------------------------------------------------------------
  }


  ngOnInit(): void {
    //==================
    // GET ALL PRODUCTS
    //==================
    this.productService.getProducts().subscribe(res=>{
      this.products = res;
    });
  }


  //=====================
  // COUNTER (QUANTITY)
  //=====================
  increment(){
    this.counter += 1;

  }
  decrement(){
    //only if counter>1
    if(this.counter>1){
      this.counter -= 1;
    }
  }


  //=====================
  // changeSize variants
  //=====================
  //select particular size from different sizes
  changeSizeVariant(variant:any){
    this.selectedSize = variant;
  }



  //=================
  // ADD TO WISHLIST
  //=================
  addToWishlist(product:Product){
    this.wishlistService.addToWishlist(product);
  }


  //===================-----------
  // ADD TO CART (if quantity != 0)
  //===================-----------
  addToCart(product:Product, quantity:number){

    //if quantity == 0
    if(quantity == 0){
      return false;
    }
    //else -> addToCart
    this.cartService.addToCart(product,quantity);
  }


  //==================
  // BUY NOW
  //==================
  //if quantity > 0 => add product to cart & goto checkout page 
  buyNow(product:Product, quantity:number){

    //if quantity>0 -> addToCart -> goto checkout page
    if(quantity > 0){
      
      //add product to cart
      this.cartService.addToCart(product,quantity);
    
      //navigate to checkout page
      this.router.navigate(['/home/checkout']);
    }
  }


}

import { Component, Input, OnInit } from '@angular/core';

//product type
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //receive (single product) data from productSlider component
  @Input() product:any;
  
  variantImage: any;
  selectedImage: any;


  //Service DI
  constructor(private productsService:ProductsService, private wishlistService:WishlistService, private cartService:CartService) { }


  ngOnInit(): void {
  }

  //---------------------------
  //To change variant image
  //---------------------------
  changeVairantImage(image: any) {
    this.variantImage = image;
    this.selectedImage = image;
  }


  //====================
  // SERVICE METHODS
  //====================
  //----- ADD TO CART -----
  addToCart(product:Product, quantity:number=1){
    this.cartService.addToCart(product,quantity);
  }

  //----- ADD TO WISHLIST -----
  addToWishlist(product:Product){
    this.wishlistService.addToWishlist(product);
  }

  //----- ADD TO COMPARE -----
  addToCompare(product:Product){
    this.productsService.addToCompare(product);
  }


}





//Single Product
//---------------
/*
  category: "women"
  colors: ["yellow"]
  description: "<html>↵<head>↵	<title></title>↵</head>↵<body>↵<p>Description</p>↵</body>↵</html>↵"
  discount: 50
  id: 2
  isNew: 0
  isSale: 0
  name: "Wrap Dress"
  pictures: (5) ["http://www.sahosoftweb.com/Images/2.jpg", "http://www.sahosoftweb.com/Images/3.jpg", "http://www.sahosoftweb.com/Images/4.jpg", "http://www.sahosoftweb.com/Images/5.jpg", "http://www.sahosoftweb.com/Images/6.jpg"]
  price: 150
  salePrice: 200
  shortDetails: "Short Details"
  size: []
  stock: 85
  tags: ["Nike"]
  variants: Array(5)
    0: {color: "yellow", images: "http://www.sahosoftweb.com/Images/2.jpg"}
    1: {color: "yellow", images: "http://www.sahosoftweb.com/Images/3.jpg"}
    2: {color: "yellow", images: "http://www.sahosoftweb.com/Images/4.jpg"}
    3: {color: "yellow", images: "http://www.sahosoftweb.com/Images/5.jpg"}
    4: {color: "yellow", images: "http://www.sahosoftweb.com/Images/6.jpg"}
*/
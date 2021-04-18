import { Component, OnInit } from '@angular/core';

//product type
import {Product} from '../../shared/classes/product';
//products service
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //All products[] 
  products:Product[] = [];

  //Products Service
  constructor(private _productService:ProductsService) { }


  ngOnInit(): void {
    
    //NOTE:
    //we need to call products API in multiple components -> call once in service
    //Again we need to call this service in productSlider & productTab component -> call once in home component & pass data as input to required components
    //------------------------------------------
    // API is called in product_Service
    // GET ALL PRODUCTS (From products service)
    //------------------------------------------
    this._productService.getProducts().subscribe(res =>{
      this.products = res;

      //console.log("Products:",res);
      /* 
      0: {id: 2, name: "Wrap Dress", price: 150, salePrice: 200, discount: 50, …}
      1: {id: 3, name: "Danim Jeans", price: 200, salePrice: 250, discount: 50, …}
      */
      //Single Product
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
    });
  }

}

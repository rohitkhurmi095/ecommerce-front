import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Product } from 'src/app/shared/classes/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {

  //------ PRODUCTS -------
  products: Product[] = [];   //allProducts (show on lazy loading)
  items: Product[] = [];     //8 products (show initially)
  allItems: Product[] = []; //8 products(assigned to this variable)

  
  //------- TAGS(Brands), COLORS --------
  //itemBrands[{brand:['all unique tags']}] pass to -> BrandFilter Component
  tags: any[] = [];
  //itemColors[{color:['all unique colors']] pass to -> ColorFilter Component
  colors: any[] = [];

  //Update tag/color filters -> Get data from brand/color filter Component
  colorFilters: any[] = [];
  tagFilters: any[] = [];

  //----- CATEGORY -------
  //(To get products by category)
  IsMen: boolean = false;
  
  //------- SCROLL ----------
  finished: boolean = false;
  lastKey: number = 0;

  
  //activatedRoute: receive params
  //productService: get products
  constructor(private route: ActivatedRoute, private productService:ProductsService) {
    
    //home/left-sidebar/collection/:category (category = men/women)
    //home/left-sidebar/collection/men
    //home/left-sidbar/collection/women
    //====================================================================
    //RECEIVE CATEGORY via routeParams & filter data based on category 
    //====================================================================
    this.route.params.subscribe(params => {
      //1)receive params as caregory(men/women)
      //---------------------------------------
      let category = params['category'];
      //console.log('CATEGORY: ',category);
      
      //2)check category
      //-----------------
      if (category == 'men') {
        this.IsMen = true;
      } else {
        this.IsMen = false;
      }

      //_________________________________________
      //FILTER DATA(product) based on 'category'
      //__________________________________________
      this.productService.getProductsByCategory(category).subscribe(res => {

        //All products by category
        //console.log('PRODUCTS BY CATEGORY: ',res);

        this.allItems = res;              //show allProducts on lazyloading
        this.products = res.slice(0, 8); //show only 8 products initially
        
        //8 products(assigned to this variable)
        this.items = this.products;
        
        //Tags(brand) Filter 
        this.getTags(res);
        
        //COLORS filter
        this.getColors(res);

        //PRICE filter is done seprately
      });
    });
  }


  ngOnInit(): void {
  }

  
  //====================
  //I) BRAND FILTER(tags)
  //====================
  getTags(products: any) {
    
    //uniqueBrands['all unique brands']
    let uniqueBrands = [];
    
    //tags(SEND to childComponent(BrandFilter))
    //itemBrands[{brand:['all unique brands']}];
    let itemBrands = [];
    
    //--------------------------------------------------------
    //1) GET unique tags as uniqueBrands[]) from all Products
    //--------------------------------------------------------
    products.map((product: Product)=>{
      //if products has column 'tags'
      if(product.tags){
        //if products has column 'tags'
        product.tags.map((tag) =>{
          
          //find index of tag in uniqueBrands[](index of 1st matching element)
          let index = uniqueBrands.indexOf(tag);

          //if tag is not found => add tag to uniqueBrands[]
          if(index === -1){
            uniqueBrands.push(tag);
          }
        });
      }
    });

    //-----------------------------
    //2) loop for all uniqueBrands
    //-----------------------------
    //itemBrands[{brand:['all unique brands']}]
    for (let i = 0; i < uniqueBrands.length; i++){
      itemBrands.push({ brand: uniqueBrands[i] });
    }

    //------------------------------------------------------------
    //3) SEND this tags as input for childComponent(Brand Filter);
    //-------------------------------------------------------------
    this.tags = itemBrands;
  }

  //______________________
  // UPDATE TAGS FILTERS
  //______________________
  updateTagFilters(tags: any) {
    this.tagFilters = tags;
  }
  //======================



  //======================
  //II) COLOR FILTER
  //======================
  getColors(products: any){

    //uniqueColors:['all unique colors'];
    let uniqueColors = [];

    //tags(SEND to childComponent(BrandFilter))
    //itemColors:[{color:['all unique colors']}];
    let itemColors = [];
    
    //----------------------------------------------------------
    //1) GET unique colors as uniqueColors[]) from all Products
    //----------------------------------------------------------
    products.map((product: Product)=>{
      //if product has column 'colors'
      if(product.colors){ 
        //for multiple colors
        product.colors.map((color) =>{
          
          //find index of 1st matching color in uniqueColor[]
          let index = uniqueColors.indexOf(color);

          //if index is not found -> add color to uniqueColor[]
          if (index === -1){
            uniqueColors.push(color);
          }
        });
      }
    });

    //-----------------------------
    //2) loop for all uniqueColor
    //-----------------------------
    //Loop through all colors of uniqueColors[]
    //itemBrands[{color:['all unique colors']}]
    for(let i = 0; i < uniqueColors.length; i++){
      itemColors.push({ color: uniqueColors[i] });
    }

    //---------------------------------------------------------------
    //3) SEND this colors as input for childComponent(Colors Filter);
    //---------------------------------------------------------------
    this.colors = itemColors;
  }

  //____________________________
  // UPDATE COLOR FILTERS
  //____________________________
  updateColorFilters(colors: any) {
    this.colorFilters = colors;
  }
  //======================

  

  //===================
  //III)PRICE FILTER
  //===================
  updatePriceFilters(price: any) {
    //Products filtered price array
    let _item: any[] = [];
    
    //price[minPrice(0),maxPrice(1)]
    this.products.filter((item: Product) =>{
      if(item.price >= price[0] && item.price <= price[1]){
        
        //add items to _item[] whose price fall in range 
        //(item.price[0]<item.price<=item.price[1])
        _item.push(item);
      }
    });
    
    //allProducts = products filtered price array
    //**All products with price filter
    this.items = _item;
  }
  //===================




  //===============>
  //-- GRID VIEW -->
  //===============>--------------------------------
  //2,3,4,6 COL view(change class based on jquery) 
  //------------------------------------------------
  /* 
    div(class="product-wrapper-grid")
      div(class="container-fluid")
        div(class="row")
          div(class="col-xl-3 col-md-6 col-grid-box")
  */

  //---------
  //col-lg-6
  //---------
  twoCol(){
    //remove all class from this div
    $(".product-wrapper-grid").children().children().children().removeClass();
     //add new class = "col-lg-6" to this div
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-6");
  }

  //---------
  //col-lg-4
  //---------
  threeCol(){
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-4");
  }

  //---------
  //col-lg-3 (default)
  //---------
  fourCol(){
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-3");
  }

  //----------
  //col-lg-2
  //----------
  sixCol(){
    $(".product-wrapper-grid").children().children().children().removeClass();
    $(".product-wrapper-grid").children().children().children().addClass("col-lg-2");
  }
  //===============>



  
  //==================================================
  // BIND DATA(products) BASED ON SCROLL (lazyloading)
  //===================--------=======================
  //DONT BIND ALL Products at once 

  filterItems(): Product[]{

    //**allProducts(with Price filter) = this.items 
    //FILTER COLOR & BRAND now (both)
    let itemData = this.items.filter((item: Product)=>{
      
      //colorFilters = all product colors
      let Colors: boolean = this.colorFilters.reduce((total, curr)=>{
        if(item.colors){
          if(item.colors.includes(curr.color as never)){
            return true;
          }
        }
      }, true);

      //tagFilters = all product tags
      let Tags: boolean = this.tagFilters.reduce((total, curr)=>{
        if(item.tags){
          if(item.tags.includes(curr as never)){
            return true;
          }
        }
      }, true);

      //&& => both true -> return true, else false
      return Colors && Tags;
    });
    //filtered item(product)
    return itemData;
  }



  //=====================
  // ON SCROLL 
  //=====================
  //initial level => 8 item binded 
  //next level => next 8 items binded
  //item finished -> no more items
  //ADD 4 items each time on scroll event

  onScroll() {
    
    //ALL PRODUCTS
    //. . . . . . . 
    //get last record id(key) value
    //allItems = allProducts (Eg: 1-100)
    //[this.allItems.length - 1] = last position index
    this.lastKey = this.allItems[this.allItems.length - 1]['id'];

    //CURRENT PRODUCT
    //. . . . . . . . .
    //current key id value
    //product = 0-8 products
    //[this.products.length - 1] = last positon index
    let currentKey = this.products[this.products.length - 1]['id'];

    //. . . . . . . . . . . . . . . . . . . . 
    //CHECK scroll FINISHED(till end) OR NOT
    //----------------------------------------------- 
    //if last product(after scroll) = current product(after scrolling 8 products)
    //-----------------------------------------------
    if(this.lastKey != currentKey){
      this.finished = false;
    }else{
      this.finished = true;
    }

    //-------------------------------------
    //ADD 4 items each time on scroll event
    //-------------------------------------
    if (this.products.length < this.allItems.length){
      let len = this.products.length;

      //from products -> products + 4(items from allItems)
      for (let i = len; i < len + 4; i++){ 
        //if item = undefined
        if (this.allItems[i] == undefined){
          return true;
        }
        //ADD items to product[]
        this.products.push(this.allItems[i]);
      }
    }
  }
  //=====================


}

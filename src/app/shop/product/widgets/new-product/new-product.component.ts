import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductCompareComponent } from '../../product-compare/product-compare.component';
import { ProductLeftSidebarComponent } from '../../product-details/product-left-sidebar/product-left-sidebar.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  //products : Proudct[]
  products:any[] = [];

  //productService
  constructor(public productService:ProductsService,private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    //====================
    // GET ALL PRODUCTS
    //====================
    this.productService.getProducts().subscribe(res=>{
      this.products = res;

      //console.log('PRODUCTS',res);
      this.changeDetectorRef.detectChanges();
    });
  }

}

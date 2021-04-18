import { Component, Input, OnInit } from '@angular/core';

//product type
import { Product } from 'src/app/shared/classes/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //receive (single product) data from productSlider component
  @Input() product:Product;

  constructor() { }

  ngOnInit(): void {
  }

}

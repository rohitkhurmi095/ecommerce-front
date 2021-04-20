import { Component, Input, OnInit } from '@angular/core';

//product type
import {Product} from '../../../shared/classes/product';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  //receiving data(products) from homeComponent
  @Input() products:Product[] = [];

  //===================
  // IMAGE CAROUSEL
  //===================
  //logo slider config
  productSliderConfig:any = {
    slideToShow:4,
    slideToScroll:4,
    infinite:true,
    autoplay:true,
    autoplaySpeed:3000,

    //Responsiveness(+209 on each breakpoint)
    responsive:[
      {
        breakpoint: 1618,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      } ,
      {
        breakpoint: 1409,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
    ]
  }
  //-------------------

  constructor() { }

  ngOnInit(): void {
  }

}

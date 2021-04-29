import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {


  //parent component = collection-left-sidebar
  //we are not getting price from database(in parent component)
  //define our own data here (ngx-slider)
  @Output() priceFilters = new EventEmitter();

  //=================
  // NGX SLIDER
  //=================
  minValue: number = 1;
  maxValue: number = 1000;
  options: Options = {
    floor: 1,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> ₹" + value;
        case LabelType.High:
          return "<b>Max price:</b> ₹" + value;
        default:
          return "₹" + value;
      }
    }
  };
  //------------------


  constructor() { }

  ngOnInit(): void {
  }

  priceChanged(event:any){
    let arr:any = [];

    //push event values(range[min-> high]) -> arr
    arr.push(event.value);     //MIN VALUE 
    arr.push(event.highValue); //MAX VALUE

    //output to parent component(collection-left-sidebar)
    this.priceFilters.emit(arr);
  }
}

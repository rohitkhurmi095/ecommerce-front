import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  //On main component we have all products(get brands) - parent-> child relationship (input decorator)
  //send filtered brands to parent component(collection-left-sidebar) child-> parent (output decorator)
  //---------------------------------------------------------------------------------------------------

  //collection-left-sidebar(products) -> brandfilter(receive product tags)
  //contains brand column
  @Input() tagsFiltersInput:any = [];
  
  //output -> parent component
  @Output() tagFiltersOutput :EventEmitter<any[]> = new EventEmitter<any[]>();

  //currently checked tags
  checkedTagArray:any = [];


  constructor() { }

  ngOnInit(): void {
  }


  //===================================================================
  // PASSING CHECKED TAGS -> Colelction-left-sidebar(parent component)
  //===================================================================
  //add current tag(checked) value to checkedTagArray
  //when tag is checked (CHANGE EVENT) - its value is stored in event.target.checked
  //if checkBox is not checked -> find index of value(tag) & remove value(tag) from checkedTagArray using splice()
  
  checkedFilter(event:any){
    //if checkBox is checked -> push value to checkedTagArray
    if(event.target.checked){
      this.checkedTagArray.push(event.target.value);
    }else{
      //if checkBox is not checked -> find index of value(tag) & remove value(tag) from checkedTagArray using splice()
      let index = this.checkedTagArray.indexOf(event.target.value);
      this.checkedTagArray.splice(index, 1);
    }
    
    //pass checkedTagArray value to parent component(collection-left-sidebar) using @Output() decorator
    this.tagFiltersOutput.emit(this.checkedTagArray);
  }
}

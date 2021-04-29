import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  //NOTE:----------------------------------------------------------------------------------------------
  //On main component we have all products(get colors) - parent-> child relationship (input decorator)
  //send filtered colors to parent component(collection-left-sidebar) child-> parent (output decorator)
  //---------------------------------------------------------------------------------------------------

  //1)get all colors(for products) from collection-left-sidebar component
  @Input() colorsFiltersInput: any = [];
  //2)send filterd color back to collection-left-sidebar component
  @Output() colorFiltersOutput: EventEmitter<any[]> = new EventEmitter<any[]>();
  
  //current color of checkbox
  activeItem: any = '';


  constructor() { }

  ngOnInit(): void {
  }


  /*NOTE: class 'active' is applied onClick on <li> if currentColor(activeItem) = filter.Color
    .color-selector ul li.active {
    border: 1px solid #000;
    position: relative;
  }
  */

  //=======================================================================
  // PASS CURRENT COLOR VALUE -> PARENT COMPONENT(collection-left-sidebar)
  //=======================================================================
  changeColor(varColors: any){
    //varColors = {} (currentColor =  varColors.color)
    this.activeItem = varColors.color;

    if(varColors.color){
      //output to parent component(collection-left-sidebar)
      this.colorFiltersOutput.emit([varColors]);
    }else{
       //if varColor = undefined => pass [] to parent component(collection-left-sidebar)
      this.colorFiltersOutput.emit([]);
    }
  }  
  
}

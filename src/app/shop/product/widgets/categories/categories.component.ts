import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //========================
    // TOGGLE COLLECTIONS TAB 
    //========================
    //----- NOTE: --------------------------------------------------------------------
    //div(class="collection-collapse-block border-0 open")
    //  h3(class="collapse-block-title")
    //  div(class="collection-collapse-block-content") - show based on 'open' class
    //---------------------------------------------------------------------------------

    $('.collapse-block-title').on('click',function(e){
      //prevent default event behaviour
      e.preventDefault();

      //$(this) = <h3 class="collapse-block-title"></h3>

      let thisItem = $(this).parent();
      //console.log('CurrentItem',thisItem); //[div.collection-collapse-block.border-0.open]

      //**Find next() div in parent div with class = .collection-collapse-block-content'
      //** SHOW this div based on 'open' class is applied or not
      let nextLevel = $(this).next('.collection-collapse-block-content');
      //console.log('Toggle div',nextLevel); //[div.collection-collapse-block-content]

      let speed = 300;
      //Check if div(nextLevel) has 'open' class 
      //if nextLevel dont have 'open' class -> add 'open' class + slideDown(speed)
      //if nextLevel have 'open' class -> add 'open' class + slideUp(speed)
      if(nextLevel.hasClass('open')){
        //remove 'open' class + slideUp
        nextLevel.removeClass('open');
        nextLevel.slideUp(speed);
      }else{
        //add 'open' class + slideDown
        nextLevel.addClass('open');
        nextLevel.slideDown(speed);
      }
    });
    //========================
  }

}

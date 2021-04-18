import { Component, Input, OnInit } from '@angular/core';

//product type
import { Product } from '../../../shared/classes/product';

//Jquery
import * as $ from 'jquery';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {

  //receiving data(products) from homeComponent
  @Input() products:Product[];

  constructor() { }

  ngOnInit(): void {

    //========================
    // JQUERY
    //========================
    //SHOW TAB1 by default (id='tab-1')
    $('#tab-1').show();

    //1)Prevent default event('click') of 'a' tag of div with class '.tabs'
    // ul(.tabs) -> li(.current) -> a(href)
    //----------------------
    $('.tabs li a').on('click', function(e){
      e.preventDefault();

      //2)remove 'current' class from 'li' of 1st 'a(href='tab1') & apply 'current' class on 'li' of 2nd 'a'(href='tab2) 
      //here a = this 
      //GOTO the parent of parent of 'a' tag (ul) -> find 'li' in it & remove class 'current'
      //Goto parent of 'a' tag(li) & add class 'current'  
      $(this).parent().parent().find('li').removeClass('current');
      $(this).parent().addClass('current');


      //3)SHOW ONLY 1 tab on click & hide other tab
      //get attribue of a(href='tab-1/tab-2') 
      //tab to show id='tab-1'
      //show tab with id as attribute of 'a' tag
      //'#' + current_tab = currentId (tab1/tab2)
      //---------------------------------------
      let current_tab = $(this).attr('href');
      $('#' + current_tab).show();
      
      //Hide all other than current tab
      //Goto a->(ul->li->div(main))
      //find div with class='tab-content' inside div(main)
      //hide all content except content with id='tab-1/tab-2' (current id)
      $(this).parent().parent().parent().find('.tab-content').not('#' + current_tab).hide();

    });
    //========================
  }

}

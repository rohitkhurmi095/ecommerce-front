import { Component, OnInit } from '@angular/core';

//Methods to open/close sidebar (written in this service)
import { LandingFixService } from 'src/app/shared/services/landing-fix.service';

//JQUERY
import * as $ from 'jquery';
import { cartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  //CART ITEMS
  shoppingCartItems:any[] = [];

  //landingFixService
  constructor(private landingFix:LandingFixService, private CartService:CartService) { }

  ngOnInit(): void {
    //LOADING SCRIPT FOR SMARTMENU (Only for this component)
    $.getScript('assets/js/menu.js');


    //===============
    //GET CART ITEMS
    //===============
    this.CartService.getCartItems().subscribe(res=>{
      this.shoppingCartItems = res;
      
    //console.log('Shoping CartItems: ',this.shoppingCartItems);
    //[{product: {…}, quantity: 2},{product: {…}, quantity: 2}]
    //cartItem.quantity = quantity
    //cartItem.product.price = price
    //total = cartItem.quantity * cartItem.product.price 
    });
  }

  
  //---------------------------
  //OPEN/CLOSE sidebar on Click (methods from landing-fix.service)
  //---------------------------
  openNav(){
    this.landingFix.addNavFix();
  }
  closeNav(){
    this.landingFix.removeNavFix();
  }

}

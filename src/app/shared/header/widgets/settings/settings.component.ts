import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/shared/classes/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private transalate:TranslateService, private CartService:CartService, public productService:ProductsService) { }

  //--------------------
  //CART ITEMS DATA
  //--------------------
  //RECEIVE CARTITEMs Data as @INPUT from 'header component'(parent)
  @Input() shoppingCartItems:any[] = [];


  ngOnInit(): void {
    
    //console.log('Shoping CartItems: ',this.shoppingCartItems);
    //[{product: {…}, quantity: 2},{product: {…}, quantity: 2}]
    //cartItem.quantity = quantity
    //cartItem.product.price = price
    //total = cartItem.quantity * cartItem.product.price 
  }

  //=============================
  //-------- TRANSLATOR ---------
  //=============================
  changeLanguage(lang: string) {
    this.transalate.use(lang);
  }
  //-----------------------------


  //=================
  // CART 
  //=================
  //REMOVE FROM CART
  //-----------------
  removeItem(item: cartItem){
    this.CartService.removeFromCart(item);
  }

  //GET TOTAL AMOUNT
  //----------------
  getTotal():Observable<number>{
    return this.CartService.getTotalAmount();
  }




}

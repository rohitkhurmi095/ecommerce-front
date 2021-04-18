import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './product/cart/cart.component';
import { CheckoutComponent } from './product/checkout/checkout.component';
import { CollectionLeftSidebarComponent } from './product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { ProductCompareComponent } from './product/product-compare/product-compare.component';
import { ProductLeftSidebarComponent } from './product/product-details/product-left-sidebar/product-left-sidebar.component';
import { SuccessComponent } from './product/product-details/success/success.component';
import { CategoriesComponent } from './product/widgets/categories/categories.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';

const routes: Routes = [
  //-- SHOP HomePage --
  //url: /home/shop
  {path:'shop',component:HomeComponent},

  //-- cart --
  //url: /home/cart
  {path:'cart',component:CartComponent},
  
  //-- wishlist --
  //url: /home/wishlist
  {path:'wishlist',component:WishlistComponent},
  
  //-- compare --
  //url: /home/compare
  {path:'compare',component:ProductCompareComponent},

  //-- checkout --
  //url: /home/checkout
  {path:'checkout',component:CheckoutComponent},
  //url: /home/checkout/success
  {path:'checkout/success',component:SuccessComponent},
  
  //-- sidebar -- 
  //url: /home/left-sidebar/product/:id
  {path:'left-sidebar/product/:id',component:ProductLeftSidebarComponent},
  //url: /home/left-sidebar/collection/:category
  {path:'left-sidebar/collection/:category',component:CollectionLeftSidebarComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LogoComponent } from './home/logo/logo.component';
import { CollectionBannerComponent } from './home/collection-banner/collection-banner.component';
import { ParallaxBannerComponent } from './home/parallax-banner/parallax-banner.component';
import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { ProductTabComponent } from './home/product-tab/product-tab.component';
import { CartComponent } from './product/cart/cart.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';
import { CheckoutComponent } from './product/checkout/checkout.component';
import { ProductCompareComponent } from './product/product-compare/product-compare.component';
import { ProductLeftSidebarComponent } from './product/product-details/product-left-sidebar/product-left-sidebar.component';
import { CategoriesComponent } from './product/widgets/categories/categories.component';
import { NewProductComponent } from './product/widgets/new-product/new-product.component';
import { CollectionLeftSidebarComponent } from './product/collection/collection-left-sidebar/collection-left-sidebar.component';
import { BrandComponent } from './product/collection/filter/brand/brand.component';
import { ColorComponent } from './product/collection/filter/color/color.component';
import { PriceComponent } from './product/collection/filter/price/price.component';
import {SliderComponent} from './home/slider/slider.component';

//forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//for API
import { SharedModule } from '../shared/shared.module';

//----- other libraries -----
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SidebarComponent } from './product/product-details/sidebar/sidebar.component';
import { SuccessComponent } from './product/success/success.component';


@NgModule({
  declarations: [HomeComponent, SliderComponent,ProductComponent, LogoComponent, CollectionBannerComponent, ParallaxBannerComponent, ProductSliderComponent, ProductTabComponent, CartComponent, WishlistComponent, CheckoutComponent, ProductCompareComponent, ProductLeftSidebarComponent, CategoriesComponent, NewProductComponent, CollectionLeftSidebarComponent, BrandComponent, ColorComponent, PriceComponent, SidebarComponent, SuccessComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //----- other libraries -----
    Ng5SliderModule,
    NgxSliderModule,
    InfiniteScrollModule,
    BarRatingModule,
    NgxImageZoomModule,
    SlickCarouselModule
  ]
})
export class ShopModule { }

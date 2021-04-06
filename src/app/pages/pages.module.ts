import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { LoginComponent } from './login/login.component';

//forms
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//image carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [ContactUsComponent, AboutUsComponent, FaqComponent, ErrorPagesComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    //for Forms
    FormsModule,
    ReactiveFormsModule,
    //for Images
    SlickCarouselModule,
    
  ],
  //export component to use in other modules
  exports:[
    ErrorPagesComponent
  ]
})
export class PagesModule { }

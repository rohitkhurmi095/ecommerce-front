import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ErrorPagesComponent } from './error-pages/error-pages.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//Url: /pages/componentName
const routes: Routes = [
  {
    path:'',
    children:[
      //aboutus,contactus, faq
      {path:'aboutus',component:AboutUsComponent},
      {path:'contactus',component:ContactUsComponent},
      {path:'faq',component:FaqComponent},
      
      //error page
      {path:'404',component:ErrorPagesComponent},
      
      //login,register
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

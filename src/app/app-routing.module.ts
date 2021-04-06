import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'home/shop',pathMatch:'full'},

  //MASTER COMPONENT(layout)
  {path:'',component:MainComponent,
    children:[
      //feature MODULES
      {path:'home',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
      {path:'pages',loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)},
    ]  
  },

  //LANDING PAGE
  {path:'landingpage', component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

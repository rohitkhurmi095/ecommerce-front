import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { TopbarComponent } from './header/widgets/topbar/topbar.component';
import { SettingsComponent } from './header/widgets/settings/settings.component';
import { MenuLeftComponent } from './header/widgets/menu-left/menu-left.component';
import { NavbarComponent } from './header/widgets/navbar/navbar.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { InformationComponent } from './footer/widgets/information/information.component';
import { SocialComponent } from './footer/widgets/social/social.component';
import { CategoriesComponent } from './footer/widgets/categories/categories.component';
import { CopyrightsComponent } from './footer/widgets/copyrights/copyrights.component';
import { WhyWeChooseComponent } from './footer/widgets/why-we-choose/why-we-choose.component';

//To use routing in shared module (RouterLink,routerOutlet: router directives)
import { RouterModule } from '@angular/router';

//Translate Module: to use translator as a pipe
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderOneComponent, TopbarComponent, SettingsComponent, MenuLeftComponent, NavbarComponent, FooterOneComponent, InformationComponent, SocialComponent, CategoriesComponent, CopyrightsComponent, WhyWeChooseComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule //Translate Module
  ],
  //to use component in outside module
  exports:[HeaderOneComponent,FooterOneComponent]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Toastr notifications
import {ToastrModule} from'ngx-toastr';

//components
import { MainComponent } from './main/main.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
//modules
import { SharedModule } from './shared/shared.module';

//Http Client 
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule, //Eager Loading
    FormsModule,
    ReactiveFormsModule,

    //Toastr notifications
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

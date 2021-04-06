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

//Interceptors
import { HeaderInterceptor } from './shared/interceptors/header-interceptor.service';
import { ResponseInterceptor } from './shared/interceptors/response-interceptor.service';


//---- ngx-TRANSLATOR ------------ 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Http Client
import {HttpClientModule,HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

//Translator file path(JSON) required for AOT Compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/",".json");
}
//---------------------------------


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
    ToastrModule.forRoot(),

    //for Translator
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  //Provide interceptors used here
  //Interceptors (multi => multiple interceptors)
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:HeaderInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ResponseInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

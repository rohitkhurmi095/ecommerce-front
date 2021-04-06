import { Inject, Injectable } from '@angular/core';

//DOCUMENT
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LandingFixService {
  //-------------------------------------------------------------------
  //NAVBAR Component - using HTML DOM classList property
  //add class open-side to div with id="mySidenav" to open sidebar
  //remove class open-side to div with id="mySidenav" to close sidebar
  //--------------------------------------------------------------------
  
  //Dependency Resolution
  constructor(@Inject(DOCUMENT) private document:Document) { }

  //add or remove CLASS to DIV with given id 
  //this.document.getElementById('id').classList.add('className'); 
  //this.document.getElementById('id').classList.remove('className');  
  


  //write methods to Open/close NAV menu here -> use in navbar widget component
  //OPEN sidebar menu (navbar)
  addNavFix(){
    this.document.getElementById("mySidenav")?.classList.add('open-side');
  }

  //CLOSE sidebar menu (navbar)
  removeNavFix(){
    this.document.getElementById("mySidenav")?.classList.remove('open-side');
  }
}

import { Component, OnInit } from '@angular/core';

//Methods to open/close sidebar (written in this service)
import { LandingFixService } from 'src/app/shared/services/landing-fix.service';

//JQUERY
import * as $ from 'jquery';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  constructor(private landingFix:LandingFixService) { }

  ngOnInit(): void {
    //LOADING SCRIPT FOR SMARTMENU (Only for this component)
    $.getScript('assets/js/menu.js');
  }

  
  //---------------------------
  //OPEN/CLOSE sidebar on Click (methods from landing-fix.service)
  //---------------------------
  openNav(){
    this.landingFix.addNavFix();
  }
  closeNav(){
    this.landingFix.removeNavFix();
  }

}

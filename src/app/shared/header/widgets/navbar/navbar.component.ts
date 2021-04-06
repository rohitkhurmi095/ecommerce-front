import { Component, OnInit } from '@angular/core';

//Menu Type
import {Menu} from './menu';
//MenuItems
import {NAVITEMS} from './navbar-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

   //variables to assign menuItems
   menuItems:Menu[] = [];

   constructor(){};

   ngOnInit(): void {
     //dynamic BINDINGmenuItems
     this.menuItems = NAVITEMS;
   }
  
}

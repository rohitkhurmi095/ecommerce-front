import { Component, OnInit } from '@angular/core';

//Menu Type
import {Menu} from './menu';
//MenuItems
import {MENUITEMS} from './menu-left-items';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {
 
  //variables to assign menuItems
  menuItems:Menu[] = [];

  constructor() { }

  ngOnInit(): void {
    //dynamic BINDINGmenuItems
    this.menuItems = MENUITEMS;
  }

}

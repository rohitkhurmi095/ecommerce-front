import { Component, OnInit } from '@angular/core';
import { Global } from '../../../shared/global';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-collection-banner',
  templateUrl: './collection-banner.component.html',
  styleUrls: ['./collection-banner.component.scss']
})
export class CollectionBannerComponent implements OnInit {

  constructor(private dataService:DataService) { }

  //category
  category:any;

  ngOnInit(): void {

    //---------------------------------
    //Get all categories (male/female)
    //---------------------------------
    this.dataService.get(Global.BASE_APT_PATH + "Category/GetAll/").subscribe(res=>{
      this.category = res.data;

      //console.log("categories (collection-banner):",res.data);
      /*data = [
	        0: {id: 1, name: "men", title: "Men", imagePath: "http://www.sahosoftweb.com/Images/sub-banner1.jpg", isSave: 10, …}
	        1: {id: 2, name: "women", title: "Women", imagePath: "http://www.sahosoftweb.com/Images/sub-banner2.jpg", isSave: 60, …}
        ]*/
      
        /* SINGLE CATEGORY DATA
        createdBy: 1
        createdOn: "07/12/2019"
        id: 1
        imagePath: "http://www.sahosoftweb.com/Images/sub-banner1.jpg"
        isSave: 10
        link: "/home/left-sidebar/collection/men"
        modifiedBy: 1
        modifiedOn: "07/12/2019"
        name: "men"
        status: "Active"
        title: "Men" 
        */
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/global';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  //BrandLogo's
  logo:any;


  //===================
  // IMAGE CAROUSEL
  //===================
  //logo slider config
  logoSliderConfig:any = {
    slideToShow:6,
    slideToScroll:6,
    infinite:true,
    autoplay:true,
    autoplaySpeed:3000,

    //Responsiveness(+284 on each breakpoint)
    responsive:[
      {
        breakpoint: 1935,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7
        }
      },
      {
        breakpoint: 1651,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      },
      {
        breakpoint: 1367,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  //-------------------
  

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //-----------------------
    // GET ALL BRAND LOGO'S
    //------------------------
    this.dataService.get(Global.BASE_APT_PATH + "BrandLogo/GetAll/").subscribe(res=>{
      this.logo = res.data;

      //console.log("Logo:",res.data);
      // data = [{},{},{},{},{}....]
      //SINGLE BRAND LOGO
      /* 
        createdBy: 1
        createdOn: "07/12/2019"
        id: 1
        imagePath: "http://www.sahosoftweb.com/Images/logo-1.png"
        modifiedBy: 1
        modifiedOn: "07/12/2019"
        name: "logo 1"
        status: "Active"
      */
    });
  }

}

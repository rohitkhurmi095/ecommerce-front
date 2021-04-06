import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {


  //==================
  //TEAMates SLIDER (SECTION III)
  //==================
  //Casourel Configuration
  teamSliderConfig={
    slidesToShow:4,
    slidesToScroll:1,
      "infinite":true,
      autoplay:true,
      //responsive
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  }

  //images & description
  team = [
    {
      image:'assets/images/about/teams/1.jpg',
      name:'Ajeet Singh',
      designation:'Lead Developer',
    },
    {
      image:'assets/images/about/teams/2.jpg',
      name: 'Chandan Singh',
      designation: 'CEO & Founder at Company'
    },
    {
      image:'assets/images/about/teams/3.jpg',
      name: 'Madhu Singh',
      designation: 'Content Writer'
    },
    {
      image:'assets/images/about/teams/4.jpg',
      name: 'Priyanshu Singh',
      designation: 'Designer'
    },
    {
      image:'assets/images/about/teams/5.jpg',
      name: 'Chandan Singh',
      designation: 'CEO & Founder at Company'
    },
  ]
  //____________________________________________


  //==================
  //TESTIMONIAL SLIDER (SECTION II)
  //==================
  testimonial = [
    {
      image: 'assets/images/about/testimonials/1.jpg',
      name: 'Chandan Singh',
      designation: 'Designer',
      description: '10 Years Exp. In Software Development, Chandan Kumar Has Sound Knowledge Of Technologies Like Angular 9, Angular 8, Angular 7, Angular 6/5/4/2, Dot Net Core, Node Js, MongoDB, JQuery, REST APIs, Python, Django, Javascript, React Js, MSSQL, DynamoDB Etc.',
    }, 
    {
      image: 'assets/images/about/testimonials/2.jpg',
      name: 'Ajeet Singh',
      designation: 'Lead Developer',
      description: '8 Years Exp. In Software Development, Ajeet Kumar Has Sound Knowledge Of Technologies Like Angular 9, Angular 8, Angular 7, Angular 6/5/4/2, Dot Net Core, Node Js, MongoDB, JQuery, REST APIs, Python, Django, MVC, Javascript, React Js,SQL Server, DynamoDB Etc.',
    }, 
    {
      image: 'assets/images/about/testimonials/3.jpg',
      name: 'Madhu Singh',
      designation: 'Content Writer',
      description: '5 Years Exp. In Software Development, Madhu Singh Has Sound Knowledge Of Technologies Like Angular 9, Angular 8, Angular 7, Angular 6/5/4/2, Dot Net Core, Node Js, MongoDB, JQuery, REST APIs, Python, Django, MVC, Javascript, React Js,SQL Server, DynamoDB Etc.',
    },
    { 
      image: 'assets/images/about/testimonials/4.jpg',
      name: 'Priyanshu Singh',
      designation: 'Designer',
      description: '3 Years Exp. In Software Development, Madhu Singh Has Sound Knowledge Of Technologies Like Angular 9, Angular 8, Angular 7, Angular 6/5/4/2, Dot Net Core, Node Js, MongoDB, JQuery, REST APIs, Python, Django, MVC, Javascript, React Js,SQL Server, DynamoDB Etc.',
    }
  ];


  // Teastimonial Slick slider config
  testimonialSliderConfig = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  //____________________________________________



  constructor() { }

  ngOnInit(): void {
  }

}

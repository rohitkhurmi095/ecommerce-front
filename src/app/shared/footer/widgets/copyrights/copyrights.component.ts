import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyrights',
  templateUrl: './copyrights.component.html',
  styleUrls: ['./copyrights.component.scss']
})
export class CopyrightsComponent implements OnInit {

  //CurrentDate
  //extract yar from date using date pipe
  today = new Date();

  //visa:string = "https://www.visa.co.in/";
  //master:string = "https://www.mastercard.co.in/en-in.html";
  //paypal:string = "https://www.paypal.com/in/home";
  //american:string = "https://www.americanexpress.com/en-in/"
  //discover:string = "https://www.discover.com/";

  constructor() { }

  ngOnInit(): void {
  }

}

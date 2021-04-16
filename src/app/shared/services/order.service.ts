import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Order Type
import {order} from '../classes/order';

//-----------------------------------------
//When user Checkout -> order is generated
//-----------------------------------------

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //OrderDetails
  private orderDetails:order;

  constructor(private router:Router) { }

  //==================
  // CREATE ORDER
  //==================
  createOrder(product:any, details:any, orderId:any, paymentDate:any, expectedDate:any, amount:any){

    //Item (Product)
    let item:order = {
      product: product,
      shippingDetails: details,
      orderId: orderId,
      paymentDate: paymentDate,
      expectedDate: expectedDate,
      totalAmount: amount,
    };

    //assign item -> oderderDetails
    this.orderDetails = item;

    //after generating order -> navigate to -> '/home/checkout/success'
    this.router.navigate(['/home/checkout/success']);
  }

  
  //===================
  // GET ORDER DETAILS
  //===================
  getOrderDetails():order{
    return this.orderDetails;
  }

}

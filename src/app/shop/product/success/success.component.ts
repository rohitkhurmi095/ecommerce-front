import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/shared/classes/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  //orderDetails
  orderDetails:any;

  //orderDetails,productService
  constructor(private orderService: OrderService, public productsService: ProductsService) { }

  ngOnInit(): void {
    
    //==================
    //GET ORDER DETAILS
    //==================
    //no need to suscribe as this is not observable
    //createOrder( product,shippingDetails,orderId,totalAmount,expectedDate,paymentDate)
    this.orderDetails = this.orderService.getOrderDetails();
    
    console.log('ORDER DETAILS: ',this.orderDetails);
    console.log('SHIPPING DETAILS FORM DATA: ',this.orderDetails.shippingDetails);
  }

}

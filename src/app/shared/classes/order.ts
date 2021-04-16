import {cartItem} from './cart-item';

export interface order{
    //---------------
    // ORDER MODEL
    //---------------
    //product,totalAmount,orderId,shippingDetails,paymentDate,expectedDate

    product?:cartItem;
    shippingDetails?:any;
    orderId?:any;
    totalAmount?: number;
    expectedDate?:any;
    paymentDate?:any
}
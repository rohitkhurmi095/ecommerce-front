import {Product} from './product';

export interface cartItem{
    //----------------
    //CART Item Model
    //----------------
    //product,quantity
   
    product?: Product; //price -> product.price
    quantity?:number
}
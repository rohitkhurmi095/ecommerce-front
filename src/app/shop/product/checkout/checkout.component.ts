import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/shared/classes/cart-item';
import { Global } from 'src/app/shared/global';
import { CartService } from 'src/app/shared/services/cart.service';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

//custom Validations
import {EmailValidator,NumericFieldValidator,TextFieldValidator} from '../../../shared/validators/validations.validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  //form instance
  checkoutForm: FormGroup;
  
  //checkoutItems(products)
  checkOutItems: cartItem[] = [];
  //orderDetails
  orderDetails: any[] = [];
  
  //AMOUNT
  amount: number;
  totalAmount: number; //amount + shippingAmount
  shippingAmount: number = 40;
 
  //PAYMENT HANDLER
  handler: any = null;
  
  //CART,ORDER,PRODUCT service
  constructor(public productsService: ProductsService, private _dataService: DataService, private _fb: FormBuilder, private _toastr: ToastrService, private cartService: CartService, private orderService: OrderService) { }


  //==============
  // FORM MODEL
  //==============
  //from API docs(/api/PaymentMaster/Save)
  createRegForm() {
    this.checkoutForm = this._fb.group({
      firstname: ['', [Validators.required, TextFieldValidator.validTextField]],
      lastname: ['', [Validators.required,  TextFieldValidator.validTextField]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, EmailValidator.validEmail]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      
      //from api docs
      amount: [0]
    });
  }

  //--------------
  //getter method
  //--------------
  //get formControl
  get f(){
    return this.checkoutForm.controls;
  }


  //WHEN VIEW IS FULLY INITIALIZED
  ngOnInit(): void {
    
    //-----------------------------------
    //STRIPE PAYMENT GATEWAY INTEGRATION
    //-----------------------------------
    this.loadStripe();

    //------------
    //form Model
    //------------
    this.createRegForm();
    
    //===============
    // cartService
    //===============
    //---------------
    //CHECKOUT ITEMS
    //---------------
    this.cartService.getOrderCartItems().subscribe(res => {
      this.checkOutItems = res;
      console.log('CHECKOUT ITEMS: ',this.checkOutItems);
    });
    //----------------------
    //calculate TOTAL AMOUNT
    //----------------------
    //(totalAmount = cartServiceAmount + shippingAmount)
    this.getTotal().subscribe(res => {
      this.amount = res;
      this.totalAmount = res + this.shippingAmount;
    });

  }

  //------------------
  // GET TOTAL AMOUNT
  //------------------
  getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }


  //================================
  // PAYMENT GATEWAY INTEGRATION
  //================================
  //LOADS ON PAYMENT BUTTON CLICK
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE',//need to change
          locale: 'auto',
          token: function () {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            //console.log(token);
            //alert('Token Created!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  

  //==============
  // SUBMIT FORM
  //==============
  onSubmit(formData: any){
    
    //IF FORM IS INVALID!
    if(this.checkoutForm.invalid){
      return;
    }

    //--------------------
    //DATA TO POST TO API
    //====================
    //CART ITEMS DATA
    //-----------------
    let allItems = [];
    //loop through all checkoutItems(cartItems) & add data -> allItems[]
    //cartItem[{product:[id,size[],color[],price,discount],quantity:number}]
    for(let i = 0; i < this.checkOutItems.length; i++){
      allItems[i] = {
        ProductId: this.checkOutItems[i].product.id,
        Quantity: this.checkOutItems[i].quantity,
        Size: '',
        Color: '',
        Price: this.checkOutItems[i].product.price,
        Discount: this.checkOutItems[i].product.discount
      }
    }

    //-----------------------------------------
    //DATA TO POST = FORMDATA + cartItemsData
    //-----------------------------------------
    //NOTE here we need to pass some additional parameters wrt api docs(POST data API)
    //which fields we have not taken as formControl
    let obj = {
      id: 0,
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      phone: formData.value.phone,
      email: formData.value.email,
      address: formData.value.address,
      country: formData.value.country,
      town: formData.value.town,
      state: formData.value.state,
      postalcode: formData.value.postalcode,

      //api docs
      amount: this.amount,
      shippingAmount: 40,
      paymentTypeId: 1,   
      items: allItems,    //(cartItemsData)
      payment: null      //added at the time of stripe api integration
    }

    
    //-------------------------
    //IF FORM IS VALID -> call API + POST DATA
    //(/api/PaymentMaster/Save)
    //-------------------------
    //saveData(obj) method is created here
    //this method is called when we get payment information
    let saveData = (obj) => this._dataService.post(Global.BASE_APT_PATH + "PaymentMaster/Save/", obj).subscribe(objdata =>{
      if(objdata.isSuccess){
        //success notification
        this._toastr.success("Payment done successfully!", "Payment Master");
        
        //1.CREATE ORDER** (via orderService)
        //createOrder( product,shippingDetails,orderId,totalAmount,expectedDate,paymentDate)
        this.orderService.createOrder(this.checkOutItems, obj, objdata.data.orderId, objdata.data.paymentDate, objdata.data.expecteddate, this.totalAmount);
        
        //2.RESET checkout form
        this.checkoutForm.reset();

        //3.CLEAR allItems from cart
       this.cartService.clearAllItemsFromCart();
      }else{
        //error notification
        this._toastr.error(objdata.errors[0], "Payment Master");
      }
    });

    
    //===================
    // For Payment here
    //===================
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_IMfLDyTjBvG9AK7MNtHntboG00XQFgMOiE',//need to change
      locale: 'auto',
      token: function (token: any) {
        let objPayment = { tokenId: token.id, amount: obj.amount + obj.shippingAmount, description: "Shopping with sahosoft mall (angular)" };
        //console.log(token);
        //update payment in obj
        obj.payment = objPayment;
        
        //call method to submit form
        saveData(obj);
      }
    });

    
    //PAYMENT HANDLER
    handler.open({
      name: 'Sahosoft Mall',
      description: 'ecommerce',
      country: 'INDIA',
      currency: 'INR',
      amount: this.totalAmount * 100 //To convert amount to INR
    });
  }
  //==============
}
 




//--------------------------------
/* NOTE: /api/paymentmaster/save/
----------------------------------
{
  "id": 0,
  "firstname": "string",
  "lastname": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "country": "string",
  "town": "string",
  "state": "string",
  "postalcode": "string",
  "amount": "string",
  "shippingAmount": "string",
  "paymentTypeId": "string",
  "items": [
    {
      "productId": 0,
      "quantity": "string",
      "size": "string",
      "color": "string",
      "price": "string",
      "discount": "string"
    }
  ],
"payment": {
    "tokenId": "string",
    "description": "string",
    "amount": 0
}, 
----------------------------*/
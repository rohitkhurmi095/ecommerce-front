import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../shared/services/data.service';
import {Global} from '../../shared/global';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //form instance
  loginForm:FormGroup;
  //initially form is not submitted
  submitted:boolean = false;

  //error message from auth service
  strMsg:string;

  constructor(private _fb:FormBuilder,private toastr:ToastrService,private _dataService:DataService,private authService:AuthService) { 
    this.strMsg = " ";

    //WHEN LOGIN COMPONENT IS CALLED -> USER GETS LOGGED OUT 1ST (if loggedIn)
    //localStorage is cleared
    this.authService.loggedOut();
  }

  ngOnInit(): void {
    this.setFormState();
  }

  //================
  // FORM MODEL (CUSTOMER MASTER)
  //================
  setFormState(){
    this.loginForm = this._fb.group({
      userName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }


  //---------------
  // getter method
  //---------------
  get f(){
    //get formControls
    return this.loginForm.controls;
  }


  //=================
  // SUBMIT FORM
  //=================
  login(){
    this.submitted = true;

    //--------------------------
    //CHECK IF FIELD IS ENTERED -> LOGIN FORM INVALID
    //--------------------------
    //if userName is not enterd
    if(this.loginForm.get('userName').value == " "){
       //error notification
       this.toastr.error("Username is required !!","Login");
       return;
    }
    //if password is not entered
    else if(this.loginForm.get('password').value == " "){
      //error notification
      this.toastr.error("Password is required !!","Login");
      return;
    }
    //--------------------------------
    // LOGIN FORM IS VALID -> ADD authCredentials to AuthService (login() Method)
    //--------------------------------
    else{
      if(this.loginForm.valid){

        //CALL API
        this._dataService.post(Global.BASE_APT_PATH + "CustomerMaster/Login", this.loginForm.value).subscribe(res =>{
          if(res.isSuccess){

            // ADD authCredentials to AuthService (login(objUserDetails) Method)
            this.authService.login(res.data);

            //** CHECK if there is ErrorMESSAGE from AuthService
            //if strMsg != "" => error -> reset form
            //if strMsg == "" => no error
            this.strMsg = this.authService.getMessage();
            if(this.strMsg != ""){
              this.toastr.error(this.strMsg, 'Login');
              this.loginForm.reset();
            }
          }else{
            //error notification -> reset form
            this.toastr.error('Invalid Credentials !',"Login");
            this.loginForm.reset();
          }
        });
      }else{
        //INVALID DATA -> reset form
        this.toastr.error("Login failed !","Login");
        this.loginForm.reset();
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../shared/services/data.service';
import { MustMatchValidator, EmailValidator } from '../../shared/validators/validations.validator';
import { Router } from '@angular/router';
import { Global } from '../../shared/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   //registerForm: FormGroup;
   registerForm: any;
   //initially form is not submitted
   submitted = false;

   //DEPENDENCY RESOLUTION
   constructor(private _dataService: DataService, private _fb: FormBuilder, private _toastr: ToastrService, private router:Router) {}

   //===================
   // FORM MODEL
   //===================
   createRegisterForm() {
     this.registerForm = this._fb.group({
       FirstName: ['', Validators.required],
       LastName: ['', Validators.required],
       EmailId: ['', [Validators.required, EmailValidator.validEmail]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', Validators.required]
     }, {
       validator: MustMatchValidator('password', 'confirmPassword')
     });
     this.registerForm.reset();
    }

   ngOnInit() {
      this.createRegisterForm();
   }
  
    //----------------
    //GETTER Method
    //----------------
    get f() { 
      return this.registerForm.controls; 
    }
 

    //=================
    // SUBMIT FORM
    //=================
    onSubmit(formData: any) {
      this.submitted = true;
     
      //if form is invalid
      if (this.registerForm.invalid) {
        return;
      }
 
      //IF FORM IS VALID -> CALL API
      this._dataService.post(Global.BASE_APT_PATH + "CustomerMaster/Save", formData.value).subscribe(res => {
          if(res.isSuccess){
            //Success notification
            this._toastr.info('Data saved successfully! ', 'Register');
            //reset form
            this.registerForm.reset();
            //submitted = false
            this.submitted = false;

            //AFTER REGISTER -> goto Login Page
            this.router.navigate(['/pages/login']);
          }else{
            //error notification
            this._toastr.error(res.errors[0], 'Register');
          }
        }
      );
    }
}

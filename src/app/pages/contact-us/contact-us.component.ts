import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Toastr notification
import { ToastrService } from 'ngx-toastr';
//BASE API PATH
import { Global } from '../../shared/global';
//Http Methods
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

   //Form Instanace
   contactusForm : any;
   //inititally form is not submitted
   submitted = false;

   //DEPENDENCY RESOLUTION
   constructor(private _dataService: DataService, private _fb: FormBuilder, private _toastr: ToastrService) { }
 
   //====================
   // FORM MODEL
   //====================
   createContactUsForm() {
     this.contactusForm = this._fb.group({
       FirstName: ['', Validators.required],
       LastName: ['', Validators.required],
       EmailId: ['', [Validators.required, Validators.email]],
       MobileNo: ['', Validators.required],
       Message: ['', Validators.required]
     });
     this.contactusForm.reset();
   }
   ngOnInit() {
     this.createContactUsForm();
   }

   //---------------
   // GETTER METHOD
   //---------------
    get f() { 
      //GET FORM Controls
      return this.contactusForm.controls; 
    }
 

   //==============
   // SUBMIT FORM
   //==============
   PostData(formData: any) {
     this.submitted = true;
     
     // stop here if form is invalid
     if (this.contactusForm.invalid) {
       return;
     }
 
     //iF FORM IS VALID -> Call API
     this._dataService.post(Global.BASE_APT_PATH + "ContactUs/Save/", formData.value).subscribe(
       data => {
         if (data.isSuccess) {
           //success notification
           this._toastr.info('Data saved successfully! ', 'Contact Us');
      
           //reset form
           this.contactusForm.reset();

           //after resetting form 
           this.submitted = false;
          } else {
            this._toastr.error(data.errors[0], 'Contact Us');
         }
       }
     );
   }
}

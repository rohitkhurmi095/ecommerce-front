//=====================
//Custom VALIDATIONS
//=====================
//::::: REGX :::::
// only alphanumeric & space : /^[0-9a-zA-Z ]+$/
// only numbers : /[0-9]+/
// char & space only : /^[a-zA-Z ]+$/
// Email Validation : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
// _________________________
//Single Contorl => class
//Multiple Contols => function

import { FormControl, FormGroup } from '@angular/forms';

//_________________________________
// Allow AlphaNumeric & space only
//_________________________________
export class TextFieldValidator{
    static validTextField(fc:FormControl){
        //validations apply only when value is there
        if(fc.value != undefined && fc.value != ''){

            //regx: /^[0-9a-zA-Z ]+$/
            const regx = /^[0-9a-zA-Z ]+$/;

            //check if regx matches pattern
            if(regx.test(fc.value)){
                //do nothing; ->validation applies in this case
                return null;
            }else{
                //if regx does not matches pattern
                //return {obj:true} => has error
                return {validTextField:true};
            }
        }else{
            //if inpit field is Empty => do not apply validations
            //(Validators.required applies in this case)
            return null;
        }
    }
}



//__________________________________
// Allow Numeric only
//___________________________________
export class NumericFieldValidator{
    static ValidNumericField(fc:FormControl){

        if(fc.value != undefined && fc.value != ''){
            //regx for Numeric fields only
            const regx = /[0-9]+/;

            //if pattern matches regx
            if(regx.test(fc.value)){
                //do nothing ->validation applies in this case
                return null;
            }else{
                //error
                return {ValidNumericField:true};
            }
        }else{
            //if inpit field is Empty => do not apply validations
            //(Validators.required applies in this case)
            return null;
        }
    }
}




//__________________________________
// Allow char & space only
//___________________________________
export class onlyCharFieldValidator{
    static validOnlyCharField(fc:FormControl){

        if(fc.value != undefined && fc.value != ''){
            //regx for Numeric fields only
            const regx = /^[a-zA-Z ]+$/;

            //if pattern matches regx
            if(regx.test(fc.value)){
                //do nothing ->validation applies in this case
                return null;
            }else{
                //error
                return {validOnlyCharField:true};
            }
        }else{
            //if inpit field is Empty => do not apply validations
            //(Validators.required applies in this case)
            return null;
        }
    }
}



//__________________________________
// Allow Valid Email only
//___________________________________
export class EmailValidator{
    static validEmail(fc:FormControl){

        if(fc.value != undefined && fc.value != ''){
            //regx for Numeric fields only
            const regx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

            //if pattern matches regx
            if(regx.test(fc.value)){
                //do nothing ->validation applies in this case
                return null;
            }else{
                //error
                return {validEmail:true};
            }
        }else{
            //if inpit field is Empty => do not apply validations
            //(Validators.required applies in this case)
            return null;
        }
    }
}



//__________________________________
// Dont allow only Whitespaces 
//___________________________________
export class NoWhiteSpaceValidator{
    static noWhiteSpaceValidator(fc:FormControl){

        if(fc.value != undefined && fc.value != ''){
            
            //regx for only WhiteSpace
            //check for whiteSpace (by converting formControl.value => string + trim string & check its length)
            const isWhiteSpace = (fc.value.toString().trim().length === 0);

            if(!isWhiteSpace){
                //DO NOTHING ->validation applies in this case 
                return null;
            }else{
                //if whiteSpace exists =>error
                return {noWhiteSpaceValidator:true};
            }

        }else{
            //if inpit field is Empty => do not apply validations
            //(Validators.required applies in this case)
            return null;
        }

    }
}



//===============================================
// ** Check password & confirmPassword matches **
//================================================
//CHECK IF 2 formControls match OR not
//password & confirmPassword 
//MustMatchValidator(password,confirmPassword);
//formControlName = password, confirmPassword
//use as: this.form.controls.confirmPassword.mustMatch

export function MustMatchValidator(controlName:string,matchingControlName:string){
    
    //return formGroup instance
    return(formGroup:FormGroup)=>{
        
        // we have formControl name & form group instance => get formControl instance
        //get formControl instance from formGroup
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        //** if mustMatch condition is not there 
        //we have to show valiation on confirmPassword input
        //if validator has found an error on matchingControl
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            // return if another validator has already found an error on the matchingControl
            return;
        }

        //** if mustMatch
        // compare control & matchControl
        //control.value != matchingControl.value => error
        if(control.value != matchingControl.value){
            matchingControl.setErrors({mustMatch:true});
        }else{
            matchingControl.setErrors(null);
        }
    
    }
}
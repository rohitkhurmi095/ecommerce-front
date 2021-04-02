import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //current user data
  private currentUserSubject = new BehaviorSubject<any>(null);
  //user is loggedIn or not
  private loggedIn = new BehaviorSubject<any>(false);
  //error message
  private message:string;
  

  constructor(private router:Router) { }

  //getter method for currentUserDetails
  //asObservable() => subject cannot be modified using next() method
  get currentUserDetails(){
    return this.currentUserSubject.asObservable();
  }

  //getter method to check user is loggedIn or not
  //asObservable() => subject cannot be modified using next() method
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  //get errorMessage
  getMessage(){
    return this.message;
  }


  
  //==================
  // LOGGED IN
  //==================
  login(ObjUserDetails:any){
    
    if(ObjUserDetails.id === 0){
      //----- USER IS NOT LOGGED IN -----
      
      //remove userDetails from localStorage
      localStorage.removeItem('userDetails');

      //set currentUserDetails = null & loggedIn = false (Behaviour Subjects)
      this.currentUserSubject.next(null);
      this.loggedIn.next(false);

      //show error message
      this.message = "Please Enter valid username & password!!";

    }else{
      //----- USER IS LOGGED IN -----

      //set currentUserDetails = objUserDetails & loggedIn = true (Behaviour Subjects)
      this.currentUserSubject.next(ObjUserDetails);
      this.loggedIn.next(true);

      //no error message
      this.message = "";

      //set userDetails in localStorage
      localStorage.setItem('userDetails',JSON.stringify(ObjUserDetails));

      //navigate to home/shop when user logs in
      this.router.navigate(['/home/shop']);
    }
  }



  //==================
  // LOGGED OUT
  //==================
  loggedOut(){
    
    //remove userDetails from localStorage
    //CLEAR localStorage
    localStorage.clear();

    //set currentUserDetails = null & loggedIn = false (Behaviour Subjects)
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);

    //navigate to login page again
    this.router.navigate(['/pages/login']);
  }

}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth.service';

@Injectable({
  providedIn: 'root'
})

//http
export class HeaderInterceptor implements HttpInterceptor {
  
  //AuthService Dependency Injection
  constructor(private _authService:AuthService) { }

  //intercept method of HttpInterceptor Interface
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Header Interceptor called...');

    let request:any;        //REQUEST TO BE MANIPULATED
    let currentUser:any;    //logged in userDetails
    let isLoggedIn:boolean; //user is loggedIn or not

    //check if user is loggedIn
    this._authService.isLoggedIn.subscribe(res=>{
      isLoggedIn = res; //true(if user is loggedIn)/false

      //if user is logged in -> get currentUser
      if(isLoggedIn){

        //current user
        this._authService.currentUserDetails.subscribe(res =>{
          currentUser = res;  //current user data (INCLUDING JWT token)

          //check if images is there using isImage header
          //remove header for image + pass JWT
          if(req.headers.has('isImage')){

            //1.delete isImage flag from header (Identified image)
            request = req.clone({
              headers:req.headers.delete('isImage')
            });
            //2.pass jwt only
            request = req.clone({
              setHeaders:{
                'Authorization':`Bearer ${currentUser.token}`
              }
            });

          }else{
            //if images is not there 
            //set headers + pass JWT
            request = req.clone({
              setHeaders:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${currentUser.token}`
              }
            });
          }
        })
      }else{

        //USER IS NOT logged in -> only set headers
        request = req.clone({
          setHeaders:{'Content-Type':'application/json'}
        });
      }
    });
    
    //call to next middleware  
    return next.handle(request);
  }
}

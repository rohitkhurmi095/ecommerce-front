import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthService){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

    //pipe => to return Observable type data without using suscribe method
    //isLoggedIn = getter method of loggedIn Observable(Behaviour Subject)
    //isLoggedIn = true if user is loggedIn
    //isLoggedIn = false if user is not loggedIn
    //auth guard returns true/false based on isLoggedIn

    return this.authService.isLoggedIn.pipe(
      map((isLoggedIn:boolean)=>{
        //if user is not loggedIn
        if(!isLoggedIn){
          //navigate to loginPage
          this.router.navigate(['pages/login']);
          return false;
        }
        //if user is loggedIn -> grant access 
        return true;
      })
    );

  }
  
}

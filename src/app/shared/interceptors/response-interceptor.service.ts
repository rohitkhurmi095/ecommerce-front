import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map,catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor{

  constructor() { }

  //intercept method of HttpInterceptor Interface
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log('Response Interceptor called...');
    
    //get Observable type req without suscribing => pipe
    //receive req from previous interceptor
    return next.handle(req).pipe(
      //retry 3 times
      retry(3),
      map((res: any) =>{
        if(res instanceof HttpResponse){
          console.log(res);
          return res;
        }
      }),
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = '';

        //error contains error
        //console.log(error);

        //----- show errors -----
        if(error.error instanceof ErrorEvent){
          //CLIENT SIDE ERROR - show only message
          errorMessage = `Error ${error.message}`;
        }else{
          //SERVER SIDE ERROR - show message + status
          errorMessage = `Error Code : ${error.status}, Message : ${error.message}`;
        } 
      
        //throw error
        return throwError(errorMessage);
      })
    )
  }
}

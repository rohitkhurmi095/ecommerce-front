import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  //HTTP Client for handling server GET,PUT,POST,DELETE requests via interceptor
  constructor(private http:HttpClient) { }

  
  //===============
  // GET
  //===============
  get(url:string):Observable<any>{
    return this.http.get(url);
  }

  
  //===============
  // POST
  //===============
  post(url:string,model:any):Observable<any>{

    const body = JSON.stringify(model);

    return this.http.post(url,body);
  }


  //--------------
  // POST IMAGES
  //---------------
  //NOTE For images we dont have to set headers
  //dont JSON.stringify(model) image data as bytes will be lost
  //create seprate handler for postImages 
  //set isImate flag in handler - to identify it is image 
  //=> avoid set headers for images in interceptors
  postImages(url:string,model:any):Observable<any>{

    let httpHeaders = new HttpHeaders().set('isImage','');

    return this.http.post(url,model);
  }



  //===============
  // PUT
  //===============
  put(url:string,model:any,id:number):Observable<any>{

    const body = JSON.stringify(model);

    return this.http.put(url + id,body);
  }

  
  //===============
  // DELETE 
  //===============
  delete(url:string,id:number):Observable<any>{

    return this.http.delete(url + id);
  }



}

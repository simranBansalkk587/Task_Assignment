import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtintercapterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentuser={token:""};
    var CurrentUserSession=sessionStorage.getItem("currentUser");
    if(CurrentUserSession !=null)
    {
      currentuser=JSON.parse(CurrentUserSession);
    }
    req=req.clone({
      setHeaders:{
        Authorization:"Bearer " + currentuser.token
      }
    })
    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { LoginService } from './login.service';
import{JwtHelperService}from '@auth0/angular-jwt' 

@Injectable({
  providedIn: 'root'
})
export class JwtactiateguradService  implements CanActivate{

  constructor(private loginService:LoginService,private router:Router,private JwtHelperService:JwtHelperService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean
   {
    
      if(this.loginService.IsAuthenticated())
    {
      return true;

    }
    else
    {
      alert('you are not authorize to access this page information !!!');
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}

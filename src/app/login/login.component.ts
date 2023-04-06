import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  login:Login=new Login();
  loginErrorMsg:string="";
  user!:SocialUser

  

  constructor(private loginService:LoginService,private router:Router,private authService:SocialAuthService ){}
  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.user=user;
    })
    
  }
signWithGoogle():any{
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}
signOut():any{
  this.authService.signOut();
}






  loginClick()
  {
    if(this.login.password!=this.login.confrimpassword)
    {
      alert("your password doesn't match with confirm Password")
    }
    else{
    //alert(this.login.username)//testing
    this.loginService.CheckUser(this.login).subscribe(
      (response)=>{
        this.router.navigateByUrl("/employee");
      },
      (error)=>{
        console.log(error);
       //alert('Wrong User Password');
      this.loginErrorMsg="Wrong User Message";
      }
    );
  }
}

}

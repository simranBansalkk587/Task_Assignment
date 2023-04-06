import { EmployeeComponent } from './employee/employee.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JwtactiateguradService } from './jwtactivegurad.service';

const routes: Routes = [

  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent,canActivate:[JwtactiateguradService]},
  {path:"about",component:AboutComponent,canActivate:[JwtactiateguradService]},
  {path:"contact",component:ContactComponent,canActivate:[JwtactiateguradService]},
  {path:"employee",component:EmployeeComponent,canActivate:[JwtactiateguradService]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }
  getAllEmployees():Observable<any>
  {
   // jwt
    // var currentuser={token:""};
    // var headers=new HttpHeaders();
    // headers=headers.set("Authorization","Bearer ");
    // var CurrentUserSession=sessionStorage.getItem("currentuser");
    // if(CurrentUserSession !=null)
    // {
    //   currentuser=JSON.parse(CurrentUserSession);
    //   headers=headers.set("Authorization","Bearer "+ currentuser.token); 

    // }
    
    return this.httpClient.get<any>("https://localhost:44303/api/employee");
  
  }
  saveEmployee(newEmployee:Employee):Observable<Employee>
  {
    return this.httpClient.post<Employee>("https://localhost:44303/api/employee",newEmployee);
 

  }
  UpdateEmployee(editemployee:Employee):Observable<Employee>
  {
    return this.httpClient.put<Employee>("https://localhost:44303/api/employee",editemployee);
 
  }
  deleteEmployee(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:44303/api/employee?id="+id);

  }
  saveImage(base64code:Employee)
  {
    // / /set the headers for the POST request
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    // create a data object to send to the server
    const data = {
      myimage: base64code
    };
    // send the POST request to the server-side endpoint
    this.httpClient.post('https://localhost:44303/api/employee', data).subscribe(response => {
      console.log('Image saved successfully', response);
    }, error => {
      console.error('Error saving image', error);
    });
  }
  

}

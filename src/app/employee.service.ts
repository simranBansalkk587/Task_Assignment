import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }
  getAllEmployees():Observable<any>
  {
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
    return this.httpClient.delete<any>("https://localhost:44303/api/employee?id"+id);

  }
}

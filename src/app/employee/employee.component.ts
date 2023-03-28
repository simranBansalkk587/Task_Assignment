import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employeeList:Employee[]=[];
  newEmployee:Employee=new Employee();
  editEmployee:Employee=new Employee();

  constructor(private employeeservice:EmployeeService){}
  ngOnInit()
  {
    this.getAll();
  }
  getAll()
  {
    this.employeeservice.getAllEmployees().subscribe(
      (response)=>{
        this.employeeList=response;
        console.log(this.employeeList)
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  SaveClick()
  {
    if(this.newEmployee.name=="")
    {
      alert('Name Empty !!');
      return;
    }
    //alert(this.newEmployee.name)
    this.employeeservice.saveEmployee(this.newEmployee).subscribe(
      (respone)=>{
       alert('data saved')
       this.getAll();
       this.newEmployee.name="",
       this.newEmployee.address="",
       this.newEmployee.salary=0
      },
    )
  }
  editclick(emp:Employee)
  {
    // alert(emp.name)
    this.editEmployee=emp;

  }
  UpdateClick()
  {
    this.employeeservice.UpdateEmployee(this.editEmployee).subscribe(
      (response)=>{
        this.getAll();
      },
      (error)=>{
         console.log(error);
      }
      ) 
  }
  DeleteClick(id:number)
  {
    let ans=window.confirm('want to delete data...');
    if(!ans)return;
    this.employeeservice.deleteEmployee(id).subscribe(
      (response)=>{
        this.getAll();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}

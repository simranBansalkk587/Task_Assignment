import Swal from 'sweetalert2';
import { Observable, Subscriber } from 'rxjs';
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpHeaders,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  employeeList:Employee[]=[];
  newEmployee:Employee=new Employee();
  editEmployee:Employee=new Employee();
  picture!: Observable<any>;
  base64code!: any
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
    
  };
  convertToBase64(file: File){

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d)
      this.picture = d
      
      this.base64code = d
     this.newEmployee.picture=d
     this.editEmployee.picture=d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {

    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


  
  

  
  constructor(private employeeservice:EmployeeService){}
  ngOnInit()
  {
    this.getAll();
   // this.convertToBase64();
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
      // this.convertToBase64();
     // this.onChange();
    // this.convertToBase64();
    this.base64code=this.newEmployee.picture="",  
       this.newEmployee.name="",
       this.newEmployee.address="",
       this.newEmployee.salary=0,
       this.newEmployee.picture=""
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
    Swal.fire({  
      
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this file!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.employeeservice.deleteEmployee(id).subscribe(
      
          (response)=>{
            
         
          this.getAll();
        }
        )
        Swal.fire(  
          'Deleted!',  
          'Your imaginary file has been deleted.',  
          'success'  
        )  
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your imaginary file is safe :)',  
          'error'  
        )  
      }  
    })  
   
  }  
}

  // saveImage()
  // {
  //   this.employeeservice.saveImage(this.newEmployee).subscribe(
  //   ()=>{},
  //   ()=>{}
  //   )
  // }

  
  
 



  

// const formData = new FormData();
// for (const key of Object.keys(this.picture.value)) {
//   const value = this.profileForm.value[key];
//   formData.append(key, value);
// }
// this.http.post(this.baseUrl + 'FileManagement/c
// reateprofile', formData, {
//   reportProgress: true,
//   observe: 'events'
// }).subscribe(event => {
//   if (event.type === HttpEventType.UploadProgress) {
//     this.progress = Math.round((100 * event.loaded) / event.total);
//   }
//   if (event.type === HttpEventType.Response) {
//     console.log(event.body);
//     this.profileForm.reset();
//   }
// });
//   onFileChanged(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       // this.labelImport.nativeElement.innerText = file.name;
//       this.profileForm.patchValue({
//         // picture: file,
//       });
    
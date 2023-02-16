import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-add-employ',
  templateUrl: './add-employ.component.html',
  styleUrls: ['./add-employ.component.scss']
})
export class AddEmployComponent implements OnInit {

  addEmployeeForm:FormGroup;
  throw_msg:any; 
  msg_success: boolean = false;
  msg_danger: boolean = false;
  subject:any = [];
  submitted = false;
  error = {};
  id:any;
  constructor(public dataservice: DataService, public route:ActivatedRoute, private formBuilder: FormBuilder, public router:Router ) { 
    this.addEmployeeForm = this.formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      designation: ['',Validators.required],
      phone_number: ['',Validators.required],
      status: [true,Validators.required]
     });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) 
    {
      this.getEmployeeById(this.id);
    }
  }

//to submit the emplyee record
  onSubmit() {
    if(this.id){
      this.submitted = true;
      let obj = this.addEmployeeForm.value;
      let id  = this.id;
      if (this.addEmployeeForm.invalid){
        return false;
      }    
      return this.dataservice.editEmployee(obj,id).subscribe(response => {
        if (response && response.code == 200) {
          this.router.navigate(['/']);
        } else {

        }
      },
        error => this.error = error
      );
    }else {
      this.submitted = true;
      let obj = this.addEmployeeForm.value;
      if (this.addEmployeeForm.invalid){
        return false;
      }    
      return this.dataservice.addEmployee(obj).subscribe(response => {
        if (response && response.code == 200) {
          this.router.navigate(['/']);
        } else {
  
        }
      },
        error => this.error = error
      );
    }
    
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addEmployeeForm.controls[controlName].hasError(errorName);
  };

  public hasEmailError = (controlName: string, errorName: string) => { 
    if(this.addEmployeeForm.controls['email'].value == "" ){
      return "Email is required";
    } else if(this.addEmployeeForm.controls['email'].status == "INVALID"){
      return "Invalid Email";
    } else {
      return this.addEmployeeForm.controls['email'].hasError(errorName);
    }
    
  };

  getEmployeeById(id:any){
    let obj = {id:id};
    this.dataservice.getEmployeeById(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.addEmployeeForm.patchValue({
            firstname: data?.firstname,
            lastname: data?.lastname,
            email: data?.email,
            designation: data?.designation,
            phone_number: data?.phone_number,
          });
       }else{
          
        }
      },
    );

  }

  //to submit the emplyee record
  updateEmployee() {
    this.submitted = true;
    let obj = this.addEmployeeForm.value;
    if (this.addEmployeeForm.invalid){
      return false;
    }    
    return this.dataservice.addEmployee(obj).subscribe(response => {
      if (response && response.code == 200) {
        this.router.navigate(['/']);
      } else {

      }
    },
      error => this.error = error
    );
  }
  
}

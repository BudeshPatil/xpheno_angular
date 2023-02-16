import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data.service';

@Component({
  selector: 'app-employ',
  templateUrl: './employ.component.html',
  styleUrls: ['./employ.component.scss']
})
export class EmployComponent implements OnInit {

  employeeList: any = [];
  constructor(public dataservice: DataService) {
    this.getAllEmployies();
  }

  ngOnInit() {

  }

  //get All all emplyee method
  getAllEmployies() {
    this.dataservice.getAllEmployies({}).subscribe((response) => {
        if (response.result) {
          this.employeeList = response.result;
        }
      else {
        this.employeeList = [];
      }
    },
    );
  }

  deleteEmployee(listid:any)
  {
    if(confirm("Are you sure to delete this Employee"))
    {
      var mylist = {id:listid};
      this.dataservice.deleteemployee(mylist).subscribe(
        (response)=> {
          if(response.code == 200) 
          {    
            this.getAllEmployies();
          }
        },
      );
    }
  }

}

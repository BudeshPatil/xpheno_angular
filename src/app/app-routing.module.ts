import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployComponent } from './add-employ/add-employ.component';
import { EmployComponent } from './employ/employ.component';

const routes: Routes = [
  {
    path:'',
    component:EmployComponent
  },
  {
    path:'employeeList',
    component:EmployComponent
  },
  {
    path:'add-employee',
    component:AddEmployComponent
  },
  {
    path:'add-employee/:id',
    component:AddEmployComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

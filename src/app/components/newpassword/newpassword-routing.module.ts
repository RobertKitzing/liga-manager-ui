import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewpasswordComponent } from './newpassword.component';

const routes: Routes = [
  {
    path: '',
    component: NewpasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class NewpasswordRoutingModule { }

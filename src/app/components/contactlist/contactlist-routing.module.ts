import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactlistComponent } from './contactlist.component';

const routes: Routes = [
  {
    path: '',
    component: ContactlistComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ContactlistRoutingModule { }

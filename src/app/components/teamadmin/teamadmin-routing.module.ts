import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamadminComponent } from './teamadmin.component';

const routes: Routes = [
  {
    path: '',
    component: TeamadminComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TeamadminRoutingModule { }

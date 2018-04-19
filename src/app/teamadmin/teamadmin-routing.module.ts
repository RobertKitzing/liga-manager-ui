import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { TeamAdminComponent } from './teamadmin.comonent';

const routes: Routes = [
  { path: 'teamadmin', component: TeamAdminComponent, data: { title: extract('TeamAdmin') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeamAdminRoutingModule { }

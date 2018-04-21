import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamAdminComponent } from './teamadmin.comonent';
import { extract } from '@app/service/i18n.service';

const routes: Routes = [
  { path: 'teamadmin', component: TeamAdminComponent, data: { title: extract('TeamAdmin') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeamAdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamAdminComponent } from './team-admin.component';

const routes: Routes = [
  {
    path: '',
    component: TeamAdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamAdminRoutingModule { }

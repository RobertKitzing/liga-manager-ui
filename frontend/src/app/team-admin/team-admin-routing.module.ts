import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin/admin.guard';
import { TeamAdminComponent } from './team-admin.component';
import { TeamAdminGuard } from './team-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: TeamAdminComponent,
    canActivate: [TeamAdminGuard],
    canActivateChild: [TeamAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamAdminRoutingModule { }

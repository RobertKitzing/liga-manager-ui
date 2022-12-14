import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamAdminRoutingModule } from './team-admin-routing.module';
import { TeamAdminComponent } from './team-admin.component';


@NgModule({
  declarations: [
    TeamAdminComponent
  ],
  imports: [
    CommonModule,
    TeamAdminRoutingModule
  ]
})
export class TeamAdminModule { }

import { NgModule } from '@angular/core';
import { TeamAdminComponent } from './teamadmin.comonent';
import { TeamAdminRoutingModule } from './teamadmin-routing.module';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';

@NgModule({
  imports: [
    SharedModule,
    TeamAdminRoutingModule
  ],
  declarations: [
    TeamAdminComponent
  ]
})
export class TeamAdminModule { }

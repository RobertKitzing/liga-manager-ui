import { NgModule } from '@angular/core';
import { TeamAdminComponent } from './teamadmin.comonent';
import { TeamAdminRoutingModule } from './teamadmin-routing.module';
import { SharedModule } from '@app/shared';

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

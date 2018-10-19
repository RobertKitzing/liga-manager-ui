import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamadminComponent } from './teamadmin.component';
import { SharedModule } from '../../shared.module';
import { TeamadminRoutingModule } from './teamadmin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeamadminRoutingModule
  ],
  declarations: [TeamadminComponent]
})
export class TeamadminModule { }

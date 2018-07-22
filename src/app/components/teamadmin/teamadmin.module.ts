import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamadminComponent } from './teamadmin.component';
import { SharedModule } from '../shared/shared.module';
import { TeamadminRoutingModule } from './teamadmin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TeamadminRoutingModule
  ],
  declarations: [TeamadminComponent]
})
export class TeamadminModule { }

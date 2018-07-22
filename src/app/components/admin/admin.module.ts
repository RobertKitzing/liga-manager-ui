import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddteamComponent } from './addteam/addteam.component';
import { ManageseasonComponent } from './manageseason/manageseason.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AddteamComponent,
    ManageseasonComponent,
    ManageusersComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddteamComponent } from './addteam/addteam.component';
import { ManageseasonComponent } from './manageseason/manageseason.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AddteamComponent,
    ManageseasonComponent
  ]
})
export class AdminModule { }

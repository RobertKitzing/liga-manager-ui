import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddteamComponent } from './addteam/addteam.component';
import { ManageseasonComponent } from './manageseason/manageseason.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagetournamentComponent } from './managetournament/managetournament.component';
import { AddtournamentroundComponent } from './managetournament/addtournamentround/addtournamentround.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AddteamComponent,
    ManageseasonComponent,
    ManageusersComponent,
    ManagetournamentComponent,
    AddtournamentroundComponent
  ],
  entryComponents: [
    AddtournamentroundComponent
  ]
})
export class AdminModule { }

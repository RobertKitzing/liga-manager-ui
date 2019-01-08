import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared.module';
import { AddteamComponent } from './addteam/addteam.component';
import { ManageseasonComponent } from './manageseason/manageseason.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagetournamentComponent } from './managetournament/managetournament.component';
import { AddtournamentroundComponent } from './managetournament/addtournamentround/addtournamentround.component';
import { MatchSchedulingComponent } from './manageseason/match-scheduling/match-scheduling.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AddteamComponent,
    ManageseasonComponent,
    ManageusersComponent,
    ManagetournamentComponent,
    AddtournamentroundComponent,
    MatchSchedulingComponent
  ],
  entryComponents: [
    AddtournamentroundComponent
  ]
})
export class AdminModule { }

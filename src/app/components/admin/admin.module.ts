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
import { AddUserComponent } from './manageusers/add-user/add-user.component';
import { UserListComponent } from './manageusers/user-list/user-list.component';
import { RenameTeamComponent } from './addteam/rename-team/rename-team.component';

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
    MatchSchedulingComponent,
    AddUserComponent,
    UserListComponent,
    RenameTeamComponent
  ],
  entryComponents: [
    AddtournamentroundComponent,
    RenameTeamComponent
  ]
})
export class AdminModule { }

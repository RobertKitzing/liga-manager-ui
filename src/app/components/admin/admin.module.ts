import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared.module';
import { ManageseasonComponent } from './manageseason/manageseason.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagetournamentComponent } from './managetournament/managetournament.component';
import { AddtournamentroundComponent } from './managetournament/addtournamentround/addtournamentround.component';
import { MatchSchedulingComponent } from './manageseason/match-scheduling/match-scheduling.component';
import { AddUserComponent } from './manageusers/add-user/add-user.component';
import { UserListComponent } from './manageusers/user-list/user-list.component';
import { RenameTeamComponent } from './manageteams/rename-team/rename-team.component';
import { EventsModule } from './events';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { ManagepitchesComponent } from './managepitches/managepitches.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    EventsModule
  ],
  declarations: [
    AdminComponent,
    ManageteamsComponent,
    ManageseasonComponent,
    ManageusersComponent,
    ManagetournamentComponent,
    AddtournamentroundComponent,
    MatchSchedulingComponent,
    AddUserComponent,
    UserListComponent,
    RenameTeamComponent,
    ManagepitchesComponent
  ],
  entryComponents: [
    AddtournamentroundComponent,
    RenameTeamComponent
  ]
})
export class AdminModule { }

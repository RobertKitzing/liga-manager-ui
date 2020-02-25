import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageseasonComponent } from './manageseason/manageseason.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagetournamentComponent } from './managetournament/managetournament.component';
import { MatchSchedulingComponent } from './manageseason/match-scheduling/match-scheduling.component';
import { UserListComponent } from './manageusers/user-list/user-list.component';
import { RenameTeamComponent } from './manageteams/rename-team/rename-team.component';
import { EventsModule } from './events';
import { ManageteamsComponent } from './manageteams/manageteams.component';
import { ManagepitchesComponent } from './managepitches/managepitches.component';
import { ManagePenaltyComponent } from './manageseason/manage-penalty/manage-penalty.component';
import { EditRankingPenaltyComponent } from './manageseason/manage-penalty/edit-ranking-penalty/edit-ranking-penalty.component';
import { EditUserDialogComponent } from './manageusers/edit-user-dialog/edit-user-dialog.component';
import { EditTournamentRoundComponent } from './managetournament/edit-tournament-round/edit-tournament-round.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    EventsModule,
    FullCalendarModule,
  ],
  declarations: [
    AdminComponent,
    ManageteamsComponent,
    ManageseasonComponent,
    ManageusersComponent,
    ManagetournamentComponent,
    EditTournamentRoundComponent,
    MatchSchedulingComponent,
    UserListComponent,
    RenameTeamComponent,
    ManagepitchesComponent,
    ManagePenaltyComponent,
    EditRankingPenaltyComponent,
    EditUserDialogComponent
  ],
})
export class AdminModule { }

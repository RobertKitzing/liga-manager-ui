import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { EventsModule } from "./events";
import { ManagePitchesComponent } from "./manage-pitches/manage-pitches.component";
import { ManageMatchDaysComponent } from "./manage-seasons/manage-match-days/manage-match-days.component";
import { ManageMatchesComponent } from "./manage-seasons/manage-matches/manage-matches.component";
import { EditRankingPenaltyComponent } from "./manage-seasons/manage-penalty/edit-ranking-penalty/edit-ranking-penalty.component";
import { ManagePenaltyComponent } from "./manage-seasons/manage-penalty/manage-penalty.component";
import { ManageSeasonTeamsComponent } from "./manage-seasons/manage-season-teams/manage-season-teams.component";
import { ManageSeasonComponent } from "./manage-seasons/manage-season/manage-season.component";
import { ManageSeasonsComponent } from "./manage-seasons/manage-seasons.component";
import { MatchSchedulingComponent } from "./manage-seasons/match-scheduling/match-scheduling.component";
import { ManageTeamsComponent } from "./manage-teams/manage-teams.component";
import { RenameTeamComponent } from "./manage-teams/rename-team/rename-team.component";
import { EditTournamentRoundComponent } from "./manage-tournaments/edit-tournament-round/edit-tournament-round.component";
import { ManageTournamentsComponent } from "./manage-tournaments/manage-tournaments.component";
import { EditUserDialogComponent } from "./manage-users/edit-user-dialog/edit-user-dialog.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { UserListComponent } from "./manage-users/user-list/user-list.component";

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    EventsModule,
  ],
  declarations: [
    AdminComponent,
    ManageSeasonsComponent,
    ManageUsersComponent,
    ManageTournamentsComponent,
    EditTournamentRoundComponent,
    MatchSchedulingComponent,
    UserListComponent,
    RenameTeamComponent,
    ManagePenaltyComponent,
    EditRankingPenaltyComponent,
    EditUserDialogComponent,
    ManageMatchDaysComponent,
    ManageMatchesComponent,
    ManageSeasonTeamsComponent,
    ManageTeamsComponent,
    ManageSeasonComponent,
    ManagePitchesComponent,
  ],
})
export class AdminModule { }

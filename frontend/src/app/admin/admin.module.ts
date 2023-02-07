import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ManageTournamentsComponent } from './manage-tournaments/manage-tournaments.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManagePitchesComponent } from './manage-pitches/manage-pitches.component';


@NgModule({
  declarations: [
    AdminComponent,
    ManageTournamentsComponent,
    ManageUsersComponent,
    ManageTeamsComponent,
    ManagePitchesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ]
})
export class AdminModule { }

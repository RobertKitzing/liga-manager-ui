import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EventsComponent } from './events/events.component';
import { ManagePitchesComponent } from './manage-pitches/manage-pitches.component';
import { ManageMatchDaysComponent } from './manage-seasons/manage-match-days/manage-match-days.component';
import { ManageMatchesComponent } from './manage-seasons/manage-matches/manage-matches.component';
import { ManagePenaltyComponent } from './manage-seasons/manage-penalty/manage-penalty.component';
import { ManageSeasonTeamsComponent } from './manage-seasons/manage-season-teams/manage-season-teams.component';
import { ManageSeasonComponent } from './manage-seasons/manage-season/manage-season.component';
import { ManageSeasonsComponent } from './manage-seasons/manage-seasons.component';
import { MatchSchedulingComponent } from './manage-seasons/match-scheduling/match-scheduling.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManageTournamentsComponent } from './manage-tournaments/manage-tournaments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'tournament',
        component: ManageTournamentsComponent,
      },
      {
        path: 'season',
        component: ManageSeasonsComponent,
        children: [
          {
            path: 'teams',
            component: ManageSeasonTeamsComponent,
          },
          {
            path: 'match-days',
            component: ManageMatchDaysComponent,
          },
          {
            path: 'matches',
            component: ManageMatchesComponent,
          },
          {
            path: 'match-scheduling',
            component: MatchSchedulingComponent,
          },
          {
            path: 'match-penalty',
            component: ManagePenaltyComponent,
          },
          {
            path: 'season',
            component: ManageSeasonComponent,
          },
        ],
      },
      {
        path: 'users',
        component: ManageUsersComponent,
      },
      {
        path: 'team',
        component: ManageTeamsComponent,
      },
      {
        path: 'pitches',
        component: ManagePitchesComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule { }

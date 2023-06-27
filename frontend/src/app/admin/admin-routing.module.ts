import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { ManagePitchesComponent } from './manage-pitches/manage-pitches.component';
import { ManageSeasonsComponent } from './manage-seasons/manage-seasons.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManageTournamentsComponent } from './manage-tournaments/manage-tournaments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        children: [
            {
                path: 'tournaments',
                component: ManageTournamentsComponent,
            },
            {
                path: 'users',
                component: ManageUsersComponent,
            },
            {
                path: 'teams',
                component: ManageTeamsComponent,
            },
            {
                path: 'pitches',
                component: ManagePitchesComponent,
            },
            {
                path: 'seasons',
                component: ManageSeasonsComponent,
            },
            {
                path: '',
                redirectTo: 'tournaments',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}

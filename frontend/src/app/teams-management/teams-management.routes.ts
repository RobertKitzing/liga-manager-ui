import { Routes } from "@angular/router";
import { teamManagementResolver } from "./team-management/team-management.resolver";

export enum TEAM_MANAGEMENT_ROUTES {
    LOGO = 'logo',
    CONTACT = 'contact'
}

export const TeamsManagementRoutes: Routes = [
    {
        path: ':teamId',
        loadComponent: () => import('./team-management').then((m) => m.TeamManagementComponent),
        resolve: {
            team: teamManagementResolver,
        },
        children: [
            {
                path: TEAM_MANAGEMENT_ROUTES.CONTACT,
                loadComponent: () => import('./team-management/edit-team-contact').then((m) => m.EditTeamContactComponent),
            },
            {
                path: TEAM_MANAGEMENT_ROUTES.LOGO,
                loadComponent: () => import('./team-management/team-logo').then((m) => m.TeamLogoComponent),
            },
            {
                path: '',
                redirectTo: TEAM_MANAGEMENT_ROUTES.CONTACT,
                pathMatch: 'full',
            },
        ],
    },
]

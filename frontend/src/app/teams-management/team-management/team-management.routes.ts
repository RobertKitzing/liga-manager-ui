import { Routes } from "@angular/router";

export enum TEAM_MANAGEMENT_ROUTES {
    LOGO = 'logo',
    CONTACT = 'contact'
}

export const TeamManagementRoutes: Routes = [
    {
        path: TEAM_MANAGEMENT_ROUTES.CONTACT,
        loadComponent: () => import('./edit-team-contact').then((m) => m.EditTeamContactComponent),
    },
    {
        path: TEAM_MANAGEMENT_ROUTES.LOGO,
        loadComponent: () => import('./team-logo').then((m) => m.TeamLogoComponent),
    },
    {
        path: '',
        redirectTo: TEAM_MANAGEMENT_ROUTES.CONTACT,
        pathMatch: 'full',
    },
]
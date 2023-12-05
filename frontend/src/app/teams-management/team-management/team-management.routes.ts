import { Routes } from "@angular/router";

export enum TEAM_MANAGEMENT_ROUTES {
    LOGO = 'logo',
}

export const TeamManagementRoutes: Routes = [
    {
        path: TEAM_MANAGEMENT_ROUTES.LOGO,
        loadComponent: () => import('./team-logo').then((m) => m.TeamLogoComponent),
    },
]
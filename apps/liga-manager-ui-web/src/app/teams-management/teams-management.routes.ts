import { Routes } from '@angular/router';
import { teamResolver } from '../team.resolver';

export enum TEAM_MANAGEMENT_ROUTES {
    LOGO = 'logo',
    CONTACT = 'contact',
}

export const TeamsManagementRoutes: Routes = [
    {
        path: ':teamid',
        loadComponent: () =>
            import('./team-management').then((m) => m.TeamManagementComponent),
        children: [
            {
                path: TEAM_MANAGEMENT_ROUTES.CONTACT,
                resolve: { team: teamResolver },
                loadComponent: () =>
                    import('./team-management/edit-team-contact').then(
                        (m) => m.EditTeamContactComponent,
                    ),
            },
            {
                path: TEAM_MANAGEMENT_ROUTES.LOGO,
                resolve: { team: teamResolver },
                loadComponent: () =>
                    import('./team-management/edit-team-logo').then(
                        (m) => m.EditTeamLogoComponent,
                    ),
            },
            {
                path: '',
                redirectTo: TEAM_MANAGEMENT_ROUTES.CONTACT,
                pathMatch: 'full',
            },
        ],
    },
];

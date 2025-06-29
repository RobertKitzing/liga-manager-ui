import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes.enum';
import { ManageSeasonsRoutes } from './manage-seasons/manage-seasons.routes';

export const AdminRoutes: Routes = [
    {
        path: ADMIN_ROUTES.TOURNAMENTS,
        loadComponent: () =>
            import('./manage-tournaments').then(
                (m) => m.ManageTournamentsComponent,
            ),
    },
    {
        path: ADMIN_ROUTES.USERS,
        loadComponent: () =>
            import('./manage-users').then((m) => m.ManageUsersComponent),
    },
    {
        path: ADMIN_ROUTES.TEAMS,
        loadComponent: () =>
            import('./manage-teams').then((m) => m.ManageTeamsComponent),
    },
    {
        path: ADMIN_ROUTES.PITCHES,
        loadComponent: () =>
            import('./manage-pitches').then((m) => m.ManagePitchesComponent),
    },
    {
        path: ADMIN_ROUTES.SEASONS,
        loadComponent: () =>
            import('./manage-seasons').then((m) => m.ManageSeasonsComponent),
        children: ManageSeasonsRoutes,
    },
    {
        path: '',
        redirectTo: ADMIN_ROUTES.SEASONS,
        pathMatch: 'full',
    },
];

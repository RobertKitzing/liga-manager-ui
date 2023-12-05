import { Routes } from '@angular/router';
import { AdminRoutes } from './admin';
import { AuthenticationService } from './shared/services';
import { inject } from '@angular/core';
import { TeamManagementRoutes } from './teams-management/team-management';

export const teamAdminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return authenticationService.isTeamAdmin || authenticationService.isAdmin;
};

export const adminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return authenticationService.isAdmin;
};

export enum APP_ROUTES {
    NEW_PASSWORD_ROUTE = 'newpassword',
    TABLE = 'table',
    CALENDAR = 'calendar',
    CONTACTS = 'contacts',
    SCHEDULE = 'schedule',
    TOURNAMENT = 'tournament',
    TEAMS_MANAGEMENT = 'teams_management',
    ADMIN = 'admin',
    HISTORY = 'history',
}

export const routes: Routes = [
    {
        path: APP_ROUTES.TABLE,
        loadComponent: () => import('./table').then((m) => m.TableComponent),
    },
    {
        path: APP_ROUTES.CALENDAR,
        loadComponent: () => import('./calendar').then((m) => m.CalendarComponent),
    },
    {
        path: APP_ROUTES.CONTACTS,
        loadComponent: () => import('./contacs').then((m) => m.ContacsComponent),
    },
    {
        path: APP_ROUTES.SCHEDULE,
        loadComponent: () => import('./schedule').then((m) => m.ScheduleComponent),
    },
    {
        path: APP_ROUTES.TOURNAMENT,
        loadComponent: () =>
            import('./tournament').then((m) => m.TournamentComponent),
    },
    {
        path: APP_ROUTES.TEAMS_MANAGEMENT,
        canActivate: [teamAdminGuard],
        loadComponent: () =>
            import('./teams-management').then((m) => m.TeamsManagementComponent),
        children: [
            {
                path: ':teamId',
                loadComponent: () => import('./teams-management/team-management').then((m) => m.TeamManagementComponent),
                children: TeamManagementRoutes,
            },
        ],
    },
    {
        path: APP_ROUTES.ADMIN,
        canActivate: [adminGuard],
        loadComponent: () =>
            import('./admin').then((m) => m.AdminComponent),
        children: AdminRoutes,
    },
    // {
    //     // path: APP_ROUTES.HISTORY,
    //     // loadChildren: () => import('./history').then((m) => m.HistoryModule),
    // },
    {
        path: '',
        redirectTo: APP_ROUTES.SCHEDULE,
        pathMatch: 'full',
    },
];

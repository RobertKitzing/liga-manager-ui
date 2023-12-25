import { Routes } from '@angular/router';
import { AdminRoutes } from './admin';
import { AuthenticationService } from './shared/services';
import { inject } from '@angular/core';
import { TeamsManagementRoutes } from './teams-management';
import { APP_ROUTES } from './app.routes.enum';

export const isLoggedInGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return authenticationService.isAuthenticated;
};

export const teamAdminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return authenticationService.isTeamAdmin || authenticationService.isAdmin;
};

export const adminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return authenticationService.isAdmin;
};

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
        canActivate: [isLoggedInGuard],
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
        path: APP_ROUTES.HALL_OF_FAME,
        loadComponent: () =>
            import('./hall-of-fame').then((m) => m.HallOfFameComponent),
    },
    {
        path: APP_ROUTES.TEAMS_MANAGEMENT,
        canActivate: [teamAdminGuard],
        loadComponent: () =>
            import('./teams-management').then((m) => m.TeamsManagementComponent),
        children: TeamsManagementRoutes,
    },
    {
        path: APP_ROUTES.ADMIN,
        canActivate: [adminGuard],
        loadComponent: () =>
            import('./admin').then((m) => m.AdminComponent),
        children: AdminRoutes,
    },
    {
        path: APP_ROUTES.HISTORY,
        loadComponent: () => import('./history').then((m) => m.HistoryComponent),
        children: [
            {
                path: APP_ROUTES.TABLE,
                loadComponent: () => import('./table').then((m) => m.TableComponent),
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
                path: '',
                redirectTo: APP_ROUTES.TABLE,
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: APP_ROUTES.SCHEDULE,
        pathMatch: 'full',
    },
];

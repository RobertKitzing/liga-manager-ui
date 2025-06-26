import { Routes } from '@angular/router';
import { AdminRoutes } from './admin';
import { AuthenticationService, UserService } from './shared/services';
import { inject } from '@angular/core';
import { TeamsManagementRoutes } from './teams-management';
import { APP_ROUTES } from './app.routes.enum';
import { userResolver } from './user.resolver';
import { map } from 'rxjs';

export const isLoggedInGuard = () => {
    return inject(UserService).loadUser();
};

export const teamAdminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return inject(UserService).loadUser().pipe(
        map(() => {
            return authenticationService.isTeamAdmin || authenticationService.isAdmin;
        }),
    );
};

export const adminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return inject(UserService).loadUser().pipe(
        map(() => {
            return authenticationService.isAdmin;
        }),
    );
};

export const routes: Routes = [
    {
        path: APP_ROUTES.TABLE,
        loadComponent: () => import('./table').then((m) => m.TableComponent),
        resolve: { user: userResolver },
    },
    {
        path: APP_ROUTES.CALENDAR,
        loadComponent: () => import('./calendar').then((m) => m.CalendarComponent),
        resolve: { user: userResolver },
    },
    {
        path: APP_ROUTES.CONTACTS,
        canActivate: [isLoggedInGuard],
        loadComponent: () => import('./contacs').then((m) => m.ContacsComponent),
    },
    {
        path: APP_ROUTES.SCHEDULE,
        loadComponent: () => import('./schedule').then((m) => m.ScheduleComponent),
        resolve: { user: userResolver },
    },
    {
        path: APP_ROUTES.TOURNAMENT,
        loadComponent: () =>
            import('./tournament').then((m) => m.TournamentComponent),
        resolve: { user: userResolver },
    },
    {
        path: APP_ROUTES.HALL_OF_FAME,
        loadComponent: () =>
            import('./hall-of-fame').then((m) => m.HallOfFameComponent),
        resolve: { user: userResolver },
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
        resolve: { user: userResolver },
        children: [
            {
                path: APP_ROUTES.TABLE,
                loadComponent: () => import('./table').then((m) => m.TableComponent),
                resolve: { user: userResolver },
            },
            {
                path: APP_ROUTES.SCHEDULE,
                loadComponent: () => import('./schedule').then((m) => m.ScheduleComponent),
                resolve: { user: userResolver },
            },
            {
                path: APP_ROUTES.TOURNAMENT,
                loadComponent: () =>
                    import('./tournament').then((m) => m.TournamentComponent),
                resolve: { user: userResolver },
            },
            {
                path: '',
                redirectTo: APP_ROUTES.TABLE,
                pathMatch: 'full',
                resolve: { user: userResolver },
            },
        ],
    },
    {
        path: '',
        redirectTo: APP_ROUTES.SCHEDULE,
        pathMatch: 'full',
        resolve: { user: userResolver },
    },
];

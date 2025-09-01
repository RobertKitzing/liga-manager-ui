import { Routes } from '@angular/router';
import { AdminRoutes } from './admin';
import { inject } from '@angular/core';
import { TeamsManagementRoutes } from './teams-management';
import { userResolver } from './user.resolver';
import { map } from 'rxjs';
import { AuthenticationService, UserService } from '@liga-manager-ui/services';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { matchResolver } from './match.resolver';
import { AppComponent } from './app.component';
import { teamResolver } from './team.resolver';
import { MatchComponent, TeamContactComponent } from '@liga-manager-ui/components';

export const isLoggedInGuard = () => {
    return inject(UserService).loadUser();
};

export const teamAdminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return inject(UserService)
        .loadUser()
        .pipe(
            map(() => {
                return (
                    authenticationService.isTeamAdmin ||
                    authenticationService.isAdmin
                );
            }),
        );
};

export const adminGuard = () => {
    const authenticationService = inject(AuthenticationService);
    return inject(UserService)
        .loadUser()
        .pipe(
            map(() => {
                return authenticationService.isAdmin;
            }),
        );
};

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        resolve: { user: userResolver },
        children: [
            {
                path: APP_ROUTES.TABLE,
                loadComponent: () => import('./table').then((m) => m.TableComponent),
            },
            {
                path: APP_ROUTES.CALENDAR,
                loadComponent: () =>
                    import('./calendar').then((m) => m.CalendarComponent),
            },
            {
                path: APP_ROUTES.CONTACTS,
                canActivate: [isLoggedInGuard],
                loadComponent: () =>
                    import('./contacs').then((m) => m.ContacsComponent),
            },
            {
                path: APP_ROUTES.SCHEDULE,
                loadComponent: () =>
                    import('./schedule').then((m) => m.ScheduleComponent),
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
                    import('./teams-management').then(
                        (m) => m.TeamsManagementComponent,
                    ),
                children: TeamsManagementRoutes,
            },
            {
                path: APP_ROUTES.ADMIN,
                canActivate: [adminGuard],
                loadComponent: () => import('./admin').then((m) => m.AdminComponent),
                children: AdminRoutes,
            },
            {
                path: APP_ROUTES.HISTORY,
                loadComponent: () =>
                    import('./history').then((m) => m.HistoryComponent),
                children: [
                    {
                        path: APP_ROUTES.TABLE,
                        loadComponent: () =>
                            import('./table').then((m) => m.TableComponent),
                    },
                    {
                        path: APP_ROUTES.SCHEDULE,
                        loadComponent: () =>
                            import('./schedule').then((m) => m.ScheduleComponent),
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
                path: `${APP_ROUTES.MATCH}/:matchid`,
                component: MatchComponent,
                // loadComponent: () => import('@liga-manager-ui/components').then((m) => m.MatchComponent),
                resolve: { match: matchResolver },
            },
            {
                path: `${APP_ROUTES.TEAM}/:teamid`,
                component: TeamContactComponent,
                // loadComponent: () => import('@liga-manager-ui/components').then((m) => m.TeamContactComponent),
                resolve: { team: teamResolver },
            },
            {
                path: '',
                redirectTo: APP_ROUTES.SCHEDULE,
                pathMatch: 'full',
            },
        ],
    },
];

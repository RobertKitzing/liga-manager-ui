import { Routes } from '@angular/router';
import { AdminRoutes } from './admin';
import { inject } from '@angular/core';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { matchResolver } from './match.resolver';
import { AppComponent } from './app.component';
import { teamResolver } from './team.resolver';
import { EditProfileComponent, MatchComponent, TeamContactComponent } from '@liga-manager-ui/components';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { Store } from '@ngxs/store';
import { AuthStateSelectors, GetAuthenticatedUser } from '@liga-manager-ui/states';
import { map, switchMap } from 'rxjs';
import { TeamsManagementRoutes } from './teams-management';

marker('NAVIGATION.MATCH');
marker('NAVIGATION.TEAM');

export const isLoggedInGuard = () => {
    const store = inject(Store);
    return store.dispatch(GetAuthenticatedUser).pipe(
        switchMap(
            () => store.select(AuthStateSelectors.properties.user).pipe(map((user) => !!user)),
        ),
    );
};

export const teamAdminGuard = () => {
    const store = inject(Store);
    return store.dispatch(GetAuthenticatedUser).pipe(
        switchMap(
            () => store.select(AuthStateSelectors.isTeamAdmin),
        ),
    );
};

export const adminGuard = () => {
    const store = inject(Store);
    return store.dispatch(GetAuthenticatedUser).pipe(
        switchMap(
            () => store.select(AuthStateSelectors.isAdmin),
        ),
    );
};

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: APP_ROUTES.TABLE,
                data: {
                    viewContext: 'progress',
                },
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
                data: {
                    viewContext: 'progress',
                },
                loadComponent: () =>
                    import('./schedule').then((m) => m.ScheduleComponent),
            },
            {
                path: APP_ROUTES.TOURNAMENT,
                data: {
                    viewContext: 'progress',
                },
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
                        data: {
                            viewContext: 'history',
                        },
                        loadComponent: () =>
                            import('./table').then((m) => m.TableComponent),
                    },
                    {
                        path: APP_ROUTES.SCHEDULE,
                        data: {
                            viewContext: 'history',
                        },
                        loadComponent: () =>
                            import('./schedule').then((m) => m.ScheduleComponent),
                    },
                    {
                        path: APP_ROUTES.TOURNAMENT,
                        data: {
                            viewContext: 'history',
                        },
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
                path: `${APP_ROUTES.MATCH}`,
                component: MatchComponent,
                resolve: { match: matchResolver },
            },
            {
                path: `${APP_ROUTES.TEAM}`,
                component: TeamContactComponent,
                resolve: { team: teamResolver },
            },
            {
                path: `${APP_ROUTES.EDIT_PROFILE}`,
                canActivate: [isLoggedInGuard],
                component: EditProfileComponent,
            },
            {
                path: `${APP_ROUTES.REGISTER}`,
                data: {
                    register: true,
                },
                component: EditProfileComponent,
            },
            {
                path: `${APP_ROUTES.NEW_PASSWORD}`,
                loadComponent: () =>
                    import('./new-password').then((m) => m.NewPasswordComponent),
            },
            {
                path: '',
                redirectTo: APP_ROUTES.SCHEDULE,
                pathMatch: 'full',
            },
        ],
    },
];

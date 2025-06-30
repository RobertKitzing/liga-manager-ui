import { Routes } from '@angular/router';
import { MANAGE_SEASON_ROUTES } from './manage-seasons.routes.enum';
// import { manageSeasonsResolver } from './manage-seasons.resolver';

export const ManageSeasonsRoutes: Routes = [
    {
        path: ':seasonId',
        resolve: {
            // season: manageSeasonsResolver,
        },
        children: [
            {
                path: MANAGE_SEASON_ROUTES.TEAMS,
                loadComponent: () =>
                    import('./manage-teams').then(
                        (m) => m.ManageTeamsComponent,
                    ),
            },
            {
                path: MANAGE_SEASON_ROUTES.MATCH_DAYS,
                loadComponent: () =>
                    import('./manage-matchdays').then(
                        (m) => m.ManageMatchdaysComponent,
                    ),
            },
            {
                path: MANAGE_SEASON_ROUTES.MATCHES,
                loadComponent: () =>
                    import('./manage-matches').then(
                        (m) => m.ManageMatchesComponent,
                    ),
            },
            {
                path: MANAGE_SEASON_ROUTES.SCHEDULE_MATCHES,
                loadComponent: () =>
                    import('./manage-schedule-matches').then(
                        (m) => m.ManageScheduleMatchesComponent,
                    ),
            },
            {
                path: MANAGE_SEASON_ROUTES.PENALTIES,
                loadComponent: () =>
                    import('./manage-penalties').then(
                        (m) => m.ManagePenaltiesComponent,
                    ),
            },
            {
                path: MANAGE_SEASON_ROUTES.START_STOP,
                loadComponent: () =>
                    import('./manage-start-stop').then(
                        (m) => m.ManageStartStopComponent,
                    ),
            },
            {
                path: '',
                redirectTo: MANAGE_SEASON_ROUTES.TEAMS,
                pathMatch: 'full',
            },
        ],
    },
];

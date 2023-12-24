import { Routes } from "@angular/router";
import { ADMIN_ROUTES } from "./admin.routes.enum";

export const AdminRoutes: Routes = [
    {
        path: ADMIN_ROUTES.TOURNAMENTS,
        loadComponent: () => import('./manage-tournaments').then((m) => m.ManageTournamentsComponent),
    },
    {
        path: ADMIN_ROUTES.USERS,
        loadComponent: () => import('./manage-users').then((m) => m.ManageUsersComponent),
    },
    {
        path: ADMIN_ROUTES.TEAMS,
        loadComponent: () => import('./manage-teams').then((m) => m.ManageTeamsComponent),
    },
    {
        path: ADMIN_ROUTES.PITCHES,
        loadComponent: () => import('./manage-pitches').then((m) => m.ManagePitchesComponent),
    },
    {
        path: ADMIN_ROUTES.SEASONS,
        loadComponent: () => import('./manage-seasons').then((m) => m.ManageSeasonsComponent),
        children: [
            {
                path: ':seasonId',
                children: [
                    {
                        path: ADMIN_ROUTES.TEAMS,
                        loadComponent: () => import('./manage-seasons/manage-teams').then((m) => m.ManageTeamsComponent),
                    },
                    {
                        path: ADMIN_ROUTES.MATCH_DAYS,
                        loadComponent: () => import('./manage-seasons/manage-matchdays').then((m) => m.ManageMatchdaysComponent),
                    },
                    {
                        path: ADMIN_ROUTES.MATCHES,
                        loadComponent: () => import('./manage-seasons/manage-matches').then((m) => m.ManageMatchesComponent),
                    },
                    {
                        path: ADMIN_ROUTES.SCHEDULE_MATCHES,
                        loadComponent: () => import('./manage-seasons/manage-schedule-matches').then((m) => m.ManageScheduleMatchesComponent),
                    },
                    {
                        path: ADMIN_ROUTES.PENALTIES,
                        loadComponent: () => import('./manage-seasons/manage-penalties').then((m) => m.ManagePenaltiesComponent),
                    },
                    {
                        path: ADMIN_ROUTES.START_STOP,
                        loadComponent: () => import('./manage-seasons/manage-start-stop').then((m) => m.ManageStartStopComponent),
                    },
                    {
                        path: '',
                        redirectTo: ADMIN_ROUTES.TEAMS,
                        pathMatch: 'full',
                    },
                ],
            },
        ],
    },
    {
        path: '',
        redirectTo: ADMIN_ROUTES.SEASONS,
        pathMatch: 'full',
    },
];

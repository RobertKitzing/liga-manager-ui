import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app-routes';

const routes: Routes = [
    {
        path: APP_ROUTES.TABLE,
        loadChildren: () => import('./table').then((m) => m.TableModule),
    },
    {
        path: APP_ROUTES.CALENDAR,
        loadChildren: () => import('./calendar').then((m) => m.CalendarModule),
    },
    {
        path: APP_ROUTES.CONTACTS,
        loadChildren: () => import('./contacs').then((m) => m.ContacsModule),
    },
    {
        path: APP_ROUTES.SCHEDULE,
        loadChildren: () => import('./schedule').then((m) => m.ScheduleModule),
    },
    {
        path: APP_ROUTES.TOURNAMENT,
        loadChildren: () =>
            import('./tournament').then((m) => m.TournamentModule),
    },
    {
        path: APP_ROUTES.TEAM_ADMIN,
        loadChildren: () =>
            import('./team-admin').then((m) => m.TeamAdminModule),
    },
    {
        path: APP_ROUTES.ADMIN,
        loadChildren: () => import('./admin').then((m) => m.AdminModule),
    },
    {
        path: APP_ROUTES.HISTORY,
        loadChildren: () => import('./history').then((m) => m.HistoryModule),
    },
    {
        path: '',
        redirectTo: 'schedule',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

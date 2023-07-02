import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';
import { TableComponent } from '@lima/table';
import { ScheduleComponent } from '@lima/schedule';
import { TournamentComponent } from '@lima/tournament';

const routes: Routes = [
    {
        path: '',
        component: HistoryComponent,
        children: [
            {
                path: 'table',
                component: TableComponent,
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
            },
            {
                path: 'tournament',
                component: TournamentComponent,
            },
            {
                path: '',
                redirectTo: 'table',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoryRoutingModule {}

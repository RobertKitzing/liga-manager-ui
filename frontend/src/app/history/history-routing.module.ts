import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from '../schedule/schedule.component';
import { TableComponent } from '../table/table.component';
import { TournamentComponent } from '../tournament/tournament.component';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    children: [
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'tournament',
        component: TournamentComponent
      },
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }

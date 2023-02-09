import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { TableModule } from '../table/table.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScheduleModule } from '../schedule/schedule.module';
import { TranslateModule } from '@ngx-translate/core';
import { TournamentModule } from '../tournament/tournament.module';


@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    TableModule,
    ScheduleModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    TournamentModule,
  ]
})
export class HistoryModule { }
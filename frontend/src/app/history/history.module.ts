import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleModule } from '@lima/schedule';
import { TournamentModule } from '@lima/tournament';

@NgModule({
    imports: [
        CommonModule,
        HistoryRoutingModule,
        ScheduleModule,
        MatToolbarModule,
        TranslateModule.forChild(),
        TournamentModule,
        HistoryComponent,
    ],
})
export class HistoryModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '@lima/table';
import { ScheduleModule } from '@lima/schedule';
import { TournamentModule } from '@lima/tournament';

@NgModule({
    declarations: [HistoryComponent],
    imports: [
        CommonModule,
        HistoryRoutingModule,
        TableModule,
        ScheduleModule,
        MatToolbarModule,
        TranslateModule.forChild(),
        TournamentModule,
    ],
})
export class HistoryModule {}

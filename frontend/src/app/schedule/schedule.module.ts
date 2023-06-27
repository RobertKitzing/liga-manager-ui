import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../pipes/custom-date/custom-date.module';
import { NumberModule } from '../pipes/number/number.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMatchResultModule } from '../components/dialogs/edit-match-result/edit-match-result.module';
import { EditMatchPitchModule } from '../components/dialogs/edit-match-pitch/edit-match-pitch.module';
import { EditMatchKickoffModule } from '../components/dialogs/edit-match-kickoff/edit-match-kickoff.module';
import { CancelMatchModule } from '../components/dialogs/cancel-match/cancel-match.module';
import { SeasonChooserModule } from '../shared/components';

@NgModule({
    declarations: [ScheduleComponent],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        TranslateModule.forChild(),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatToolbarModule,
        MatSelectModule,
        ReactiveFormsModule,
        CustomDateModule,
        SeasonChooserModule,
        NumberModule,
        MatDialogModule,
        EditMatchResultModule,
        EditMatchPitchModule,
        EditMatchKickoffModule,
        CancelMatchModule,
    ],
})
export class ScheduleModule {}

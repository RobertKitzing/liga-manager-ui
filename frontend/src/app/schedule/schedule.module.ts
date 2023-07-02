import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { CustomDateModule, NumberModule } from '@lima/shared/pipes';
import { SeasonChooserModule } from '@lima/shared/components';
import {
    EditMatchResultModule,
    EditMatchPitchModule,
    EditMatchKickoffModule,
    CancelMatchModule,
} from '@lima/shared/dialogs';

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

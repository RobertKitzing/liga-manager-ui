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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDateModule } from '../pipes/custom-date/custom-date.module';
import { SeasonChooserModule } from '../components/season-chooser/season-chooser.module';
import { NumberModule } from '../pipes/number/number.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMatchResultModule } from '../components/dialogs/edit-match-result/edit-match-result.module';
import { EditMatchPitchModule } from '../components/dialogs/edit-match-pitch/edit-match-result.module';


@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    TranslateModule,
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
  ]
})
export class ScheduleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


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
  ]
})
export class ScheduleModule { }

import { NgModule } from '@angular/core';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../shared/shared.module';
import { AppCoreModule } from 'src/app/app-core.module';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    SharedModule,
    AppCoreModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }

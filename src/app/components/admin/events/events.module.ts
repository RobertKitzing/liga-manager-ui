import { NgModule } from '@angular/core';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EventsComponent } from './events.component';
import { AppCoreModule } from 'src/app/app-core.module';

@NgModule({
  imports: [
    EventsRoutingModule,
    SharedModule,
    AppCoreModule
  ],
  declarations: [
    EventsComponent
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }

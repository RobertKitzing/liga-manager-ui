import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EventsRoutingModule { }

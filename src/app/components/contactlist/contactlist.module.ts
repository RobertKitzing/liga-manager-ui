import { NgModule } from '@angular/core';
import { ContactlistComponent } from './contactlist.component';
import { PitchesComponent } from './pitches';
import { ContactlistRoutingModule } from './contactlist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  imports: [
    SharedModule,
    ContactlistRoutingModule
  ],
  declarations: [
    ContactlistComponent,
    PitchesComponent,
    TeamsComponent
  ]
})
export class ContactlistModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLogosComponent } from './team-logos.component';
import { TeamLogosRoutingModule } from './team-logos-routing.module';

@NgModule({
  declarations: [
    TeamLogosComponent,
  ],
  imports: [
    TeamLogosRoutingModule,
    CommonModule,
  ],
})
export class TeamLogosModule { }

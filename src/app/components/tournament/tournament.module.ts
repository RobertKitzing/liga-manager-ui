import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent } from './tournament.component';
import { SharedModule } from '../shared/shared.module';
import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule
  ],
  declarations: [TournamentComponent]
})
export class TournamentModule { }

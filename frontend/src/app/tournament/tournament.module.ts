import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent } from './tournament.component';
import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
    imports: [CommonModule, TournamentRoutingModule, TournamentComponent],
})
export class TournamentModule {}

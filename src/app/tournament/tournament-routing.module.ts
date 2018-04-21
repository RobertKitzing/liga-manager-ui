import { TournamentComponent } from '@app/tournament/tournament.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/service/i18n.service';

const routes: Routes = [
  { path: 'tournament', component: TournamentComponent, data: { title: extract('Tournament') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TournamentRoutingModule { }

import { TournamentComponent } from '@app/tournament/tournament.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';

const routes: Routes = Route.withShell([
  { path: 'tournament', component: TournamentComponent, data: { title: extract('Tournament') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TournamentRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { MatchplanComponent } from './matchplan.component';

const routes: Routes = Route.withShell([
  { path: 'matchplan', component: MatchplanComponent, data: { title: extract('Matchplan') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MatchplanRoutingModule { }

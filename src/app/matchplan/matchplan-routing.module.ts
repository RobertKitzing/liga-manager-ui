import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchplanComponent } from './matchplan.component';
import { extract } from '@app/service/i18n.service';

const routes: Routes = [
  { path: '', redirectTo: 'matchplan', pathMatch: 'full' },
  { path: 'matchplan', component: MatchplanComponent, data: { title: extract('Matchplan') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MatchplanRoutingModule { }

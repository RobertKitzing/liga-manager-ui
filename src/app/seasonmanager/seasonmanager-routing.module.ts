import { SeasonManagerComponent } from './seasonmanager.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';

const routes: Routes = Route.withShell([
  { path: 'seasonmanager', component: SeasonManagerComponent, data: { title: extract('Table') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SeasonManagerRoutingModule { }

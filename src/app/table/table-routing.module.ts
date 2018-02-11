import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';

const routes: Routes = Route.withShell([
  { path: 'table', component: TableComponent, data: { title: extract('Table') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TableRoutingModule { }

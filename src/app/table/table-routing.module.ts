import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/service/i18n.service';


const routes: Routes = [
  { path: 'table', component: TableComponent, data: { title: extract('Table') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TableRoutingModule { }

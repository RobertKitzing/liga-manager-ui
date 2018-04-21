import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/service/i18n.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }

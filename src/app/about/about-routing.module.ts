import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { extract } from '@app/service/i18n.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: { title: extract('About') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule { }

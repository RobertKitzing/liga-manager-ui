import { NgModule } from '@angular/core';
import { TournamentComponent } from './tournament.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TournamentComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TournamentRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchplanComponent } from './matchplan.component';

const routes: Routes = [
  {
    path: '',
    component: MatchplanComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MatchplanRoutingModule { }

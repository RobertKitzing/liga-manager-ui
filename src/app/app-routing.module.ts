import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'table',
    loadChildren: './components/table#TableModule'
  },
  {
    path: 'matchplan',
    loadChildren: './components/matchplan#MatchplanModule'
  },
  {
    path: 'admin',
    loadChildren: './components/admin#AdminModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

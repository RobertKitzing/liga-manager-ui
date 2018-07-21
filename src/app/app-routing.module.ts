import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './components/admin/admin.guard';

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
    loadChildren: './components/admin#AdminModule',
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
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

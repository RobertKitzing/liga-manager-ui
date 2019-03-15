import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './components/admin/admin.guard';
import { TeamadminGuard } from './components/teamadmin/teamadmin.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'matchplan',
    pathMatch: 'full'
  },
  {
    path: 'table',
    loadChildren: './components/table#TableModule'
  },
  {
    path: 'matchplan',
    loadChildren: './components/matchplan#MatchplanModule'
  },
  {
    path: 'tournament',
    loadChildren: './components/tournament#TournamentModule'
  },
  {
    path: 'newpassword',
    loadChildren: './components/newpassword#NewpasswordModule',
  },
  {
    path: 'contacts',
    loadChildren: './components/contactlist#ContactlistModule',
    canLoad: [TeamadminGuard],
    canActivate: [TeamadminGuard]
  },
  {
    path: 'admin',
    loadChildren: './components/admin#AdminModule',
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
  },
  {
    path: 'teamadmin',
    loadChildren: './components/teamadmin#TeamadminModule',
    canLoad: [TeamadminGuard],
    canActivate: [TeamadminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

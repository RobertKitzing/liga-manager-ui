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
    loadChildren: () => import('./components/table').then(m => m.TableModule)
  },
  {
    path: 'matchplan',
    loadChildren: () => import('./components/matchplan').then(m => m.MatchplanModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./components/calendar').then(m => m.CalendarModule),
  },
  {
    path: 'tournament',
    loadChildren: () => import('./components/tournament').then(m => m.TournamentModule)
  },
  {
    path: 'newpassword',
    loadChildren: () => import('./components/newpassword').then(m => m.NewpasswordModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./components/contactlist').then(m => m.ContactlistModule),
    canLoad: [TeamadminGuard],
    canActivate: [TeamadminGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin').then(m => m.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard]
  },
  {
    path: 'teamadmin',
    loadChildren: () => import('./components/teamadmin').then(m => m.TeamadminModule),
    canLoad: [TeamadminGuard],
    canActivate: [TeamadminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      relativeLinkResolution: 'legacy',
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

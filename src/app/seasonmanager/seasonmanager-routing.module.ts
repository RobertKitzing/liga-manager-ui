import { IsAdminGuard } from './../core/authentication/isadmin.guard';
import { SeasonManagerComponent } from './seasonmanager.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { Route, extract } from '@app/core';

const routes: Routes = Route.withShell([
  {
    path: 'seasonmanager',
    component: SeasonManagerComponent,
    data: { title: extract('SeasonManager') },
    canActivate: [IsAdminGuard]
   }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsAdminGuard]
})
export class SeasonManagerRoutingModule { }

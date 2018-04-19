import { SeasonManagerComponent } from './seasonmanager/seasonmanager.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, IsAdminGuard } from '@app/core';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        data: { title: extract('Admin') },
        canActivate: [IsAdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule { }

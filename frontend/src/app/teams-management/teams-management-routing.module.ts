import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeamsManagementComponent } from "./teams-management.component";
import { TeamsManagementGuard } from "./teams-management.guard";

const routes: Routes = [
    {
        path: '',
        component: TeamsManagementComponent,
        canActivate: [TeamsManagementGuard],
        canActivateChild: [TeamsManagementGuard],
        children: [
            {
                path: ':teamId',
                loadChildren: () => import('./team-management').then((m) => m.TeamManagementModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamsManagementRoutingModule {}

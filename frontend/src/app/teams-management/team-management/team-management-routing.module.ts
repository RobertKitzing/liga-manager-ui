import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeamLogosComponent } from "./team-logos";
import { TeamManagementComponent } from "./team-management.component";


const routes: Routes = [
    {
        path: '',
        component: TeamManagementComponent,
        children: [
            { path: '', redirectTo: 'team-logos', pathMatch: 'full' },
            {
                path: 'team-logos',
                loadChildren: () => import('./team-logos').then((m) => m.TeamLogosModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamManagementRoutingModule {}

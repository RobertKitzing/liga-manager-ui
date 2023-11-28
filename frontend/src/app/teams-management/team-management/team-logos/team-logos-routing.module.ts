import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeamLogosComponent } from "./team-logos.component";

const routes: Routes = [
    {
        path: '',
        component: TeamLogosComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamLogosRoutingModule {}

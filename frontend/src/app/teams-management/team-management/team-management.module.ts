import { NgModule } from '@angular/core';
import { TeamManagementComponent } from './team-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamManagementRoutingModule } from './team-management-routing.module';

@NgModule({
    imports: [
        TeamManagementRoutingModule,
        MatToolbarModule,
        TeamManagementComponent,
    ],
})
export class TeamManagementModule { }

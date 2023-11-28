import { NgModule } from '@angular/core';
import { TeamManagementComponent } from './team-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamManagementRoutingModule } from './team-management-routing.module';

@NgModule({
  declarations: [
    TeamManagementComponent,
  ],
  imports: [
    TeamManagementRoutingModule,
    MatToolbarModule,
  ],
})
export class TeamManagementModule { }

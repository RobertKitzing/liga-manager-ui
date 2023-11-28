import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamsManagementComponent } from './teams-management.component';
import { TeamsManagementRoutingModule } from './teams-management-routing.module';

@NgModule({
    declarations: [TeamsManagementComponent],
    imports: [
        CommonModule,
        TeamsManagementRoutingModule,
        MatButtonModule,
        MatToolbarModule,
    ],
})
export class TeamsManagementModule {}

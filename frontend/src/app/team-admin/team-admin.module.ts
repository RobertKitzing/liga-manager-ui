import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamAdminRoutingModule } from './team-admin-routing.module';
import { TeamAdminComponent } from './team-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [TeamAdminComponent],
    imports: [
        CommonModule,
        TeamAdminRoutingModule,
        MatSidenavModule,
        MatButtonModule,
    ],
})
export class TeamAdminModule {}

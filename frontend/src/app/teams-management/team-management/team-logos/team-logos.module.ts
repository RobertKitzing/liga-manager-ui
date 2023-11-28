import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLogosComponent } from './team-logos.component';
import { TeamLogosRoutingModule } from './team-logos-routing.module';
import { ApiModule, BASE_PATH } from '@api/openapi';
import { TeamService } from '@lima/shared/services';


@NgModule({
  declarations: [
    TeamLogosComponent,
  ],
  imports: [
    TeamLogosRoutingModule,
    CommonModule,
  ],
})
export class TeamLogosModule { }

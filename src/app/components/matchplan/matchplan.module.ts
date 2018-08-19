import { NgModule } from '@angular/core';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MatchplanRoutingModule,
    SharedModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }

import { NgModule } from '@angular/core';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppCoreModule } from '../../app-core.module';

@NgModule({
  imports: [
    MatchplanRoutingModule,
    SharedModule,
    AppCoreModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }

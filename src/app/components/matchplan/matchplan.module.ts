import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatchplanRoutingModule,
    SharedModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }

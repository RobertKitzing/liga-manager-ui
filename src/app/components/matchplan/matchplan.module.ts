import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    MatchplanRoutingModule,
    MaterialModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }

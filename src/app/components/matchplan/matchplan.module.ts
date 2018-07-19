import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchplanComponent } from './matchplan.component';
import { MatchplanRoutingModule } from './matchplan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatchplanRoutingModule
  ],
  declarations: [
    MatchplanComponent
  ]
})
export class MatchplanModule { }
